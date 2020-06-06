#include <ctype.h> // Upper
#include <stdarg.h>  // va_*

/**
 * Logs de error en cliente y servidor
 */
void fatal(char* string) {
    printf("%s\n", string);
    exit(1);
}



/**
 *
 */
int create_socket(int port, int queue_size) {
    printf("%d\n", port);
    int s, b, l, on = 1;
    struct sockaddr_in channel; // contiene la dirección IP 
    // Construye la estructura de la dirección para enlazar el socket. 
    memset(&channel, 0, sizeof(channel)); // canal cero 
    channel.sin_family = AF_INET;
    channel.sin_addr.s_addr = htonl(INADDR_ANY);
    channel.sin_port = htons(port);
    // Apertura pasiva. Espera una conexión. 
    s = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP); // crea el socket 
    if (s < 0) fatal((char*)"socket failed");
    setsockopt(s, SOL_SOCKET, SO_REUSEADDR, (char* ) &on, sizeof(on));
    b = bind(s, (struct sockaddr* ) &channel, sizeof(channel));
    if (b < 0) fatal((char*)"bind failed");
    l = listen(s, queue_size); // especifica el tamaño de la cola 
    if (l < 0) fatal((char*)"listen failed");
    // El socket ahora está configurado y enlazado. Espera una conexión y procesa. 
    return s;
}





/**
 * Esta funcion combierte un string a uppercase
 */
void makeupper(char* base) {
    char* baseUC = strtok(base,":");
    char* s = baseUC;
    while (*s) {
       *s = toupper((unsigned char)* s);
        s++;
    }
}


/**
 * Esta funcion permite concatenar cadena de caracteres
 */
char* concat(int count, ...) {
  va_list ap;
  int i;

  // Find required length to store merged string
  int len = 1; // room for NULL
  va_start(ap, count);
  for(i=0 ; i<count ; i++){
    len += strlen(va_arg(ap, char*));
  }
  va_end(ap);

  // Allocate memory to concat strings
  char *merged = (char*)calloc(sizeof(char),len);
  int null_pos = 0;

  // Actually concatenate strings
  va_start(ap, count);
  for(i=0 ; i<count ; i++) {
    char *s = va_arg(ap, char*);
    strcpy(merged+null_pos, s);
    null_pos += strlen(s);
  }
  va_end(ap);

  return merged;
}