// Modulos
#include <sys/types.h>
#include <sys/fcntl.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <linux/socket.h>
#include <sys/socket.h>
#include <cstring>
#include <stdio.h>
#include <unistd.h>
#include <cstdlib>
#include <string.h>
// Estructuas 
#include "utils/server/structures.cpp"
// Archivos
#include "utils/common.cpp"
#include "utils/server/exe.cpp"
// 


#define SERVER_PORT 1234 // arbitrario, pero el cliente y el servidor deben coincidir
#define QUEUE_SIZE 10



// Utils
void fatal(char* string);
int create_socket(int port, int queue_size);
void makeupper(char* base);
char* concat(int count, ...);
// Main
// void exe(struct Connection conection, char* option, bool flag);
void exe(struct Connection conection, bool flag);
// 


// --- Credentials
char* CREDENTIALS[5][2] = {
    { (char*)"anonymous", (char*)"" },
    { (char*)"fer",       (char*)"fer123" },
    { (char*)"a",         (char*)"a" },
    { (char*)"b",         (char*)"b" },
    { (char*)"c",         (char*)"c" }
};

// Mantiene el registro del usuario logeado
struct Session currentSession;


/**
 * Funcion principal para ejecutar el servidor
 */

int main(int argc, char* argv[]) {
    int pid; // id del proceso
    printf("--- Server On ---\n\n\n");
    // Registro inicial de la sesion del usuario
    currentSession.status= false;
    currentSession.indexSession= -1;
    
    int socket = create_socket(SERVER_PORT, QUEUE_SIZE);

    struct Connection conection;
    conection.buf_size = 4096; // tamaño del bloque para la transferencia

    while (true) {
        // Estructura que contiene el sa y el buf_size para las funciones de comandos
        conection.sa = accept(socket, 0, 0); // se bloquea para la solicitud de conexión 
        if (conection.sa < 0) fatal((char*)"accept failed");
        
        char buf[conection.buf_size]; // búfer para el archivo saliente 
        
        pid = fork();
        
        if (pid < 0) fatal((char*)"Cannot create child process.");
        if (pid == 0) {
            while (conection.sa) {
                exe(conection, false);
            }    
        }
    }
    close(conection.sa); // cierra la conexión
}
