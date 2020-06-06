#include <time.h>
#include "./../ftp_codes.cpp" // Este archivo contiene los codigos de FTP
#include "functions.cpp"

#define QUEUE_SIZE 10

// Esta variable solo es para desarrollo imprime los mensajes en terminal
bool LOGS = true;

// Se obtiene las credenciales de acceso desde server.cpp
extern char* CREDENTIALS[5][2];
extern struct Session currentSession;


// Funciones en archivo importado
int getUserIndexInCredentials(char *item, char *array[5][2]);
// Funciones locales
char* USER(char* parameter);
char* PASS(char* parameter);
char* HELP();
void PASV(struct Connection conection);
// void menuPassive(struct Connection conection, char* string, bool*  userAccount);
void listCommand(struct Connection conection);


/**
 * Esta es la funcion principal que evalua los comandos de FTP
*/
void exe(struct Connection conection, bool flag) {
    char response[conection.buf_size];
    
    char commandLine[conection.buf_size];
    memset(commandLine, 0, conection.buf_size); // clear buffer;
    read(conection.sa, commandLine, conection.buf_size); /* lee el comando desde el socket [buf]*/ 

    // Imprimir logs
    if (LOGS) {
        printf("------------------ LOGS -------------------\n");
        printf("--> Current Session:\n\tStatus: %d\n\tIndex: %d\n", currentSession.status, currentSession.indexSession);
        printf("--> Client:\n\tInput: <%s>\n", commandLine);
    }

    // Obtener el comando
    char command[25];
    sscanf((char*)commandLine,"%s", command);
    makeupper(command);

    // Imprimir logs
    if (LOGS) printf ("\tCommand: <%s>\n", command);

    
    // Opciones de comandos
    if (strcmp(command,"USER") == 0) {
        // Obtener el parametro
        char parameter[25];
        sscanf((char*)commandLine,"%*s %s", parameter);

        // Imprimir logs
        if (LOGS) printf("\tParameter: <%s>\n", parameter);
        
        // Ejecutar accion
        strcpy(response, USER(parameter));
        write(conection.sa, response, strlen(response));
    }



    else if (strcmp(command,"PASS") == 0) {
        // Obtener el parametro
        char parameter[25];
        sscanf((char*)commandLine,"%*s %s", parameter);

        // Imprimir logs
        if (LOGS) printf("Parametro: %s\n", parameter);
        
        // Ejecutar accion
        strcpy(response, PASS(parameter));
        write(conection.sa, response, strlen(response));
    }



    else if (strcmp(command,"PORT") == 0) {
        strcpy(response, "Comando 'PORT'\n");
        write(conection.sa, response, strlen(response));
    }
    else if (strcmp(command,"LIST") == 0) {
        if( !flag ){
            strcpy(response,"Primero intente ejecutar 'PASV' \n");
            write(conection.sa, response, strlen(response));
        }
        else{
            listCommand(conection);
        }
    }
    else if (strcmp(command,"PASV") == 0) {
        PASV(conection);
    }
    else if (strcmp(command,"SYS") == 0)  {
        strcpy(response,"SYS command detected\n");
        write(conection.sa, response, strlen(response));
    }
    else if (strcmp(command,"HELP") == 0) {
        strcpy(response, HELP());
        write(conection.sa, response, strlen(response));
    }
    else{
        strcpy(response, code_500);
        write(conection.sa, response, strlen(response));
    }
    memset(commandLine, 0, conection.buf_size); // clear buffer;
}



/**
 *
 */
char* USER(char* parameter) {
    // El usuario es "anonymous" no requiere validacion
    if (strcmp(parameter, "anonymous") == 0) {
        currentSession.status = true;
        currentSession.indexSession = 0;
        if (LOGS) printf("--> [ACTION]: Updated Session:\n\tStatus: %d\n\tIndex: %d\n", currentSession.status, currentSession.indexSession);
        return code_230;
    }

    // Se busca el ID del usuario a ingresar
    currentSession.indexSession = getUserIndexInCredentials(parameter, CREDENTIALS);
    
    // El usuario no se encuentra en la lista de usuarios permitidos
    if (currentSession.indexSession < 0) {
        if (LOGS) printf("--> [ACTION]: Updated Session:\n\tStatus: %d\n\tIndex: %d\n", currentSession.status, currentSession.indexSession);
        return code_332;
    }

    // El usuario esta bien, se espera en un futuro la contraseña
    if (LOGS) printf("--> [ACTION]: Updated Session:\n\tStatus: %d\n\tIndex: %d\n", currentSession.status, currentSession.indexSession);
    return code_331;
}



/**
 *
 */
char* PASS(char* parameter) {
    // Comprobamos si se encuentro el usuario y si la contraseña hace match
    if ((currentSession.indexSession >= 0) && (strcmp(parameter, CREDENTIALS[currentSession.indexSession][1])) == 0) {
        currentSession.status = true;
        if (LOGS) printf("--> [ACTION]: Updated Session:\n\tStatus: %d\n\tIndex: %d\n", currentSession.status, currentSession.indexSession);
        return code_230;
    }
    // El usuario hizo un mal loggin
    currentSession.status = false;
    currentSession.indexSession = -1;
    if (LOGS) printf("--> [ACTION XXX]: Error updating (incorrect password)\n");
    return code_530; // NOTE: Enviar el codigo 530 o 332?
}



/**
 *
 */
void PASV(struct Connection conection) {
    int pid;
    // Mensaje del modo pasivo
    char pasv_message[50];
    char* host = (char*)"127.0.0.1";
    srand(time(NULL));
    int port = rand() % 4321 + 1024;
    sprintf (pasv_message, "%s ( %s %d ).\n", code_227, host, port);
    printf("-->%s\n", pasv_message);

    write(conection.sa, pasv_message, strlen(pasv_message));

    int data_socket = create_socket(port, QUEUE_SIZE);
    
    struct Connection data_conection;
    data_conection.buf_size = 4096; // tamaño del bloque para la transferencia
    data_conection.sa = accept(data_socket, 0, 0); /* se bloquea para la solicitud de conexión */
    if (data_conection.sa < 0) fatal((char*)"accept failed");

    char buf[conection.buf_size]; // búfer para el archivo saliente 

    pid = fork();
    if (pid < 0) fatal((char*)"Cannot create child process.");
    if (pid == 0) {
        close(conection.sa); // close parent;
        while (data_conection.sa) {
            exe(data_conection, true);
        }
    }
}




/**
 *
 */
char* HELP() {
    if (LOGS) printf("--> [ACTION]: Showing help menu");
    return concat(2, code_214, "Los siguientes comandos son reconocidos:\n\t* user\t * pass\n\t* port\t * list\n\t* pasv\t * sys\n\t* help\n");
}





/**
 *
 */
void listCommand(struct Connection conection) {
    int bytes, fd;
    char* buf[conection.buf_size];
    system((char*)"ls -l > ls.txt");

    fd = open((char*)"ls.txt", O_RDONLY); // abre el archivo para regresarlo 
    if (fd < 0) fatal((char*)"open failed");
    while (1) {
        bytes = read(fd, buf, conection.buf_size); // lee del archivo 
        if (bytes <= 0) break; // verifica el final del archivo 
        write(conection.sa, buf, bytes); // cdescribe bytes en el socket 
    }
}
