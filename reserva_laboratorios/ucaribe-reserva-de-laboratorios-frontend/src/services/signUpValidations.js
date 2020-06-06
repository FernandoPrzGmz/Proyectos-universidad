export const nameValidation = (text, checkEmpty=false) => {
  const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$/;
  // Comprobar si la entrada esta vacia solo si checkEmpty viene como verdadero
  if( checkEmpty && text.trim() === '' ){
    return {
      state  : false,
      rbState: 'error',
      message: 'La entrada no debe estar vacia.'
    }
  }
  // Comprobar el regex
  if( regex.test(text.trim()) ){
    return {
      state  : true,
      rbState: 'success',
      message: ''
    };
  } else {
    return {
      state  : false,
      rbState: 'error',
      message: 'La entrada debe contener unicamente letras.'
    };
  }
}

export const teacherEnrollmentValidation = (text, checkEmpty=false) => {
  const regex = /^[a-zA-Z]*$/;
  // Comprobar si la entrada esta vacia solo si checkEmpty viene como verdadero
  if( checkEmpty && text.trim() === '' ){
    return {
      state  : false,
      rbState: 'error',
      message: 'La entrada no debe estar vacia.'
    }
  }
  // Comprobar el regex
  if( regex.test(text.trim()) ){
    return {
      state  : true,
      rbState: 'success',
      message: ''
    };
  } else {
    return {
      state  : false,
      rbState: 'error',
      message: 'La entrada debe contener unicamente letras.'
    };
  }
}

export const studentEnrollmentValidation = (text, checkEmpty=false) => {
  const regex = /^[0-9]*$/;
  // Comprobar si la entrada esta vacia solo si checkEmpty viene como verdadero
  if( checkEmpty && text.trim() === '' ){
    return {
      state  : false,
      rbState: 'error',
      message: 'La entrada no debe estar vacia.'
    }
  }
  // Comprobar el regex
  if( regex.test(text.trim()) ){
    return {
      state  : true,
      rbState: 'success',
      message: ''
    };
  } else {
    return {
      state  : false,
      rbState: 'error',
      message: 'La entrada debe contener unicamente números.'
    };
  }
}

export const passwordValidation = (text, checkEmpty=false) => {
  /** TODO: Validacion de contraseñas
   * - Seguridad de la contraseña: poco segura.
   * - No puede contener tu nombre ni tu dirección de correo electrónico. 
   * ? Contiene un número o simbolo.
   */
  const minCharLength = 8;
  // Comprobar si la entrada esta vacia solo si checkEmpty viene como verdadero
  if( checkEmpty && text.trim() === '' ){
    return {
      state  : false,
      rbState: 'error',
      message: 'La contraseña no debe estar vacia.'
    }
  }
  // Comprobar el minimo de 8 caracteres
  if( text.length < minCharLength ){
    return {
      state  : false,
      rbState: 'error',
      message: 'La contraseña debe ser no menor a 8 caracteres.'
    }
  }
  // Si todo es correcto
  return {
    state  : true,
    rbState: 'success',
    message: ''
  }
}