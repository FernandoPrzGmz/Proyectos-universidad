<?php
  // require_once("generalClases.php");
  class Cuenta /*extends General*/{
    const TABLE_NAME = "cuenta";
    const ID_FIELD = "id_cuenta";

    public static function getBalanceByID($id){
      $result = DatabaseSettings::getConnection()->query("SELECT balance, estatus FROM `".static::TABLE_NAME."` WHERE ".static::ID_FIELD."='$id';");
      return json_encode( $result->fetchAll()); //string
    }
    public static function update($id, $json){
      if(is_int($id) && $id != 0){
        if(is_string($json)){
          $obj = json_decode($json);
          //Nos aseguramos si se pudo crear el objeto para poder trabajar con el.
          if($obj !== null){
            $fields2updates = "";
            //unimos las campos y el valor para hacer la consulta
            foreach(get_object_vars($obj) as $attribute => $value){
              $fields2updates .= "$attribute = '$value', ";
            }
            //Actualizar el registro
            $final_query = "UPDATE ".static::TABLE_NAME." SET ".substr($fields2updates, 0, -2)." WHERE ".static::TABLE_NAME.".".static::ID_FIELD." = $id;";
            DatabaseSettings::getConnection()->query($final_query);
            // return "Se ha actualizado con exito el registro con id=[$id].";
            return $final_query;
          } else { return "Error: Formato incorrecto para el json. [$json].";}
        } else { return "Error: Debe recibirse una cadena de caracteres.";}
      } else { return "Error: El id [$id] no es valido.";}
    }
  }


?>
