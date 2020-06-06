// Modulos
#include <sys/types.h>
#include <linux/socket.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <cstring>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <cstdlib>
// Archivos
#include "utils/common.cpp"


#define SERVER_PORT 1234 // arbitrario, pero el cliente y servidor deben coincidir
#define BUF_SIZE 4096 // tamaño de bloque para transferencia




// Utils
void fatal(char *string);
void clientActions(char* string);
void passiveConnection(char* host, char* port);



/**
 *
 */
int main(int argc, char **argv) {
    printf("--- Client On ---\n");    
    int c, s, bytes;
    char command[BUF_SIZE];
    char buf[BUF_SIZE]; // búfer para el archivo entrante
    struct hostent *h; // información sobre el servidor
    struct sockaddr_in channel; // contiene la dirección IP
    if (argc != 2) {
        fatal ((char*)"Usage: client server-name");
    }

    h = gethostbyname(argv[1]); // busca la dirección IP del host
    if (!h) {
        fatal ((char*)"gethostbyname failed");
    }

    s = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (s < 0) {
        fatal ((char*)"socket");
    } 
    
    memset(&channel, 0, sizeof(channel));
    channel.sin_family= AF_INET;
    memcpy(&channel.sin_addr.s_addr, h->h_addr, h->h_length);
    channel.sin_port= htons(SERVER_PORT);
    c = connect(s, (struct sockaddr *) &channel, sizeof(channel));
    if (c < 0) {
        fatal ((char*)"connect failed");
    } 
    // Se ha establecido la conexión. Se envía el nombre del archivo incluye el byte 0 al final.
    // write(s, argv[2], strlen(argv[2])+1);
    // Obtiene el archivo y lo escribe en la salida estándar.
    while (1) {
        printf("ftp> ");
        fgets(command, sizeof(command), stdin);
        write(s,command,strlen(command)-1);
        bytes = read(s, buf, BUF_SIZE); // lee del socket
        // keep reading
        if (bytes <= 0) {
            exit(0); // verifica el final del archivo
        } 
        write(1, buf, bytes); // escribe en la salida estándar
        clientActions(buf);
    }
}



/**
 *
 */
void clientActions(char* response) {
    // Se obtiene el codigo del servidor
    char code[3];
    sscanf((char*)response,"%s", code);

    if (strcmp(code,"227") == 0) {
        // Se obtiene la direccion y puerto
        char host[20], port[5];
        sscanf((char*)response,"%*s %*s %*s %*s ( %s %s ).", host, port); // response => 227 Iniciando modo pasivo ( 127 0 0 1 123 456 ).
        
        printf("host --->%s\n", host);
        printf("port --->%s\n", port);

        passiveConnection(host, port);
    }
    
}



/**
 *
 */
void passiveConnection(char* host, char* port) {
    int c, s, bytes;
    char command[BUF_SIZE];
    char buf[BUF_SIZE]; // búfer para el archivo entrante
    struct hostent *h; // información sobre el servidor
    struct sockaddr_in channel; // contiene la dirección IP

    h = gethostbyname(host); // busca la dirección IP del host
    if (!h) {
        fatal ((char*)"gethostbyname failed");
    }
    s = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (s < 0) {
        fatal ((char*)"socket");
    } 
    memset(&channel, 0, sizeof(channel));
    channel.sin_family= AF_INET;
    memcpy(&channel.sin_addr.s_addr, h->h_addr, h->h_length);
    channel.sin_port= htons(atoi(port));
    c = connect(s, (struct sockaddr *) &channel, sizeof(channel));
    if (c < 0) {
        fatal ((char*)"connect failed");
    } 
    // Se ha establecido la conexión. Se envía el nombre del archivo incluye el byte 0 al final.
    // write(s, argv[2], strlen(argv[2])+1);
    // Obtiene el archivo y lo escribe en la salida estándar.
    while (1) {
        fgets(command, sizeof(command), stdin);
        write(s,command,strlen(command)-1);
        bytes = read(s, buf, BUF_SIZE); // lee del socket
        write(1, buf, bytes); // escribe en la salida estándar
    }
    
}
