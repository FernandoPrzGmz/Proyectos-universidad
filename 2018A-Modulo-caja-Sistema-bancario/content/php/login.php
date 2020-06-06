<?php
  require_once("settings.php");
  session_start();

  $user_email    = $_POST['user_email'];
  $user_password = $_POST['user_password'];

  $objQuery = DatabaseSettings::getConnection()->query("SELECT id_usuario, nombre, password FROM `usuario` WHERE correo='$user_email'")->fetchAll();
  if ($objQuery != null) {
    $idUser = $objQuery[0]['id_usuario'];
    $idPass = $objQuery[0]['password'];

    if($idPass === $user_password){
      $objQuery = DatabaseSettings::getConnection()->query("SELECT id_caja from caja WHERE id_usuario_asignado = $idUser")->fetchAll();
      if ($objQuery != null){
        //Creamos la session
        $_SESSION['id_caja'] = $objQuery[0]['id_caja'];
        echo "true";
      } else {echo "Al usuario no se le ha asignado una caja. <br />Para más información es recomendable hablar con un administrador."; }
    } else { echo "Contraseña incorrecta."; }
  } else { echo "No sé encontre ninguna cuenta afiliada con el correo '[$user_email]'."; }

?>
