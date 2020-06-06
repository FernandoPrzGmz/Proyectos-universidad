<?php
 class DatabaseSettings{
   const SERVER         = "localhost";
   const USER_NAME      = "root";
   const USER_PASSWORD  = "";
   const DATABASE_NAME  = "yarelyDB";

   public static function getConnection(){
     try {
         $conexion = new PDO('mysql:host='.static::SERVER.';dbname='.static::DATABASE_NAME . ';charset=utf8', static::USER_NAME, static::USER_PASSWORD);
         return $conexion;
       }
     catch (PDOException $e) {
       echo 'Falló la conexión: '.$e->getMessage();
     }
   }
 }

?>
