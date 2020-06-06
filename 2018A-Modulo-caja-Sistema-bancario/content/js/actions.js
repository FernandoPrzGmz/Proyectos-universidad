/*
  Funcion para enviar los datos al backend
  Se envian como parametros el número de tarjeta, el pin, el monto y el tipo de movimiento
*/
function login(){
  var parametros = {
      "user_email"     : $('#login_email').val(),
      "user_password"  : $('#login_password').val()
    };

  $.ajax({
    url:   './content/php/login.php',
    data:  parametros,
    type:  'POST',
    beforeSend: function() {
      $("#infoLog").html("Intentando iniciar la sesión.");
    },
    success: function (response,  status) {
      if(response === "true"){
        $("#infoLog").html("Correcto, redireccionando ...");
        location.href ="./index.php";
      } else {
        $("#infoLog").html(response);
      }
    }
  });

}

function realizaTransaccion(){
  var parametros = {
      "num_tarjeta"     : $('#num_tarjeta').val(),
      "pin_tarjeta"     : $('#pin_tarjeta').val(),
      "monto_operacion" : $('#monto_operacion').val(),
      "tipo_movimiento" : $('#tipo_mov').val()
    };

  $.ajax({
    url:   './content/php/caja.php',
    data:  parametros,
    type:  'POST',
    beforeSend: function() {
      $("#infoMov").html("Procesando transacción, espere por favor...");
    },
    success: function (response,  status) {
      $("#infoMov").html(response);
    }
  });
}

/*
  Funcion para ocultar el campo del pin en un deposito
*/
function selectAction(){
   if($('#tipo_mov').val() === "DEPOSITO"){
     $('#view_pin').hide();
     $('#pin_tarjeta').val('');
   } else {
     $('#view_pin').show();
   }
}

/*
  Verificar si el campo es de puros números
*/

function inpTarj(longInput, objTag){
  if ((!/^([0-9])*$/.test(objTag.val()) || objTag.val().length != longInput) && objTag.val() != ""){
    objTag.css("background-color", "rgba(255, 0, 0, 0.33)");
  } else {
    objTag.css("background-color", "#FFFFFF");
  }
}
function inputsTarj(objTag){
  switch (objTag.attr('id')) {
    case 'num_tarjeta':
      inpTarj(16, objTag);
      break;
    case 'pin_tarjeta':
      inpTarj(4, objTag);
      break;
    default: break;
  }
}
/*
  Comprobar si el monto para la transacción es mayor a 0 y si es un numero
*/

function inpMonto(objTag){
  if ((!/^[0-9]+([.][0-9]+)?$/.test(objTag.val()) || objTag.val() < 0) && objTag.val() != ""){
    objTag.css("background-color", "rgba(255, 0, 0, 0.33)");
  } else {
    objTag.css("background-color", "#FFFFFF");
  }
}
