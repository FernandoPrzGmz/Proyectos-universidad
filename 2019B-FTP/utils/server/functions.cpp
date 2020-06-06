


/**
 * Esta funcion obtiene el index del usuario a loggear asi como si ya se encuentra activo
 */
int getUserIndexInCredentials(char *item, char *array[5][2]) {
  for (int i = 0; i < 5; i++) {
    if(strcmp(item, array[i][0]) == 0) {
      return i;
    }
  }
  return -1;
}