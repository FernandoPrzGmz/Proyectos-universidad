<?php
  session_start();

  require_once("settings.php");
  require_once("cuenta.php");

  class Caja{
    /*Rango para los movimientos*/
    const RETIRO   = [
      "min" => 100,
      "max" => 8000
    ];
    const DEPOSITO = [
      "min" => 50,
      "max" => 5000
    ];
    /************************/
    static public function getDate(){
        date_default_timezone_set('America/Mexico_City');
        return date('Y-m-d h:i:s'); // 2018-04-12 00:00:00
    }
    static public function folio(){
      // 25 Caracteres
      date_default_timezone_set('America/Mexico_City');
      return "ADMI".rand(100,999)."-".date('Ymdhis'); // 2018-04-12 00:00:00:0000
    }
    static public function validarPin($numTarj, $pin){
      $result = DatabaseSettings::getConnection()->query("SELECT pin, estatus FROM tarjeta WHERE tarjeta.numero = $numTarj")->fetchAll();
      return ($result != null && $result[0][0] == $pin && $result[0][1] == "ACTIVO") ? true : false; //Comprobamos si el pin es el mismo de la tarjeta y esta activa
    }
    /*Mensajes del frontend */
    static public function successMsg($userTarj,$numTarj, $cStatus, $folio, $date, $montoMov, $details, $prevBal, $finalBal){
      //TODO: Añadir el propietario
      return ('
        <div class="panel panel-success">
          <div class="panel-heading">
              <label class="panel-title">
                  Movimiento Satisfactorio
              </label>
          </div>
          <div class="panel-body ">
            <h4>Datos de la operación:</h4>

            <div class="col-md-6">
              <label> Fecha: </label>
              <small>'.$date.'</small>
            </div>
            <div class="col-md-6">
              <label> Folio: </label>
              <small>'.$folio.'</small>
            </div>
            <div class="col-md-12"><hr /></div>
            <!--<div class="col-md-12">
              <label> Propietario: </label>
              <small>'.$userTarj.'</small>
            </div>-->
            <div class="col-md-6">
              <div>
                <label> Número de Tarjeta: </label>
                <small><br/>'.$numTarj.'</small>
              </div>
              <div>
                <label>Monto Previo: </label>
                <small>$'.$prevBal.' MXN</small>
              </div>
              <div>
                <label> Monto Final: </label>
                <small>$'.$finalBal.' MXN</small>
              </div>

            </div>

            <div class="col-md-6">
              <div>
                <label>Estado: </label>
                <small>'.$cStatus.'</small>
              </div>
              <div>
                <label><br />Detalles: </label>
                <small><br />'.$details.'</small>
              </div>
            </div>

          </div>
        </div>
      ');
    }
    static public function alertMsg($info){
      return ('
        <div class="panel panel-danger">
          <div class="panel-heading">
              <label class="panel-title">
                  Error en movimiento:
              </label>
          </div>
          <div class="panel-body ">
            '.$info.'
          </div>
        </div>
      ');
    }
    /************************/
    static public function realizarRetiro($numTarj, $pinTarj, $idCaja, $cantRet){
      if ($cantRet >= static::RETIRO["min"] && $cantRet <= static::RETIRO["max"]){
        if(static::validarPin($numTarj, $pinTarj)){
          $objCnt = DatabaseSettings::getConnection()->query("SELECT id_cuenta, id_tarjeta FROM tarjeta WHERE numero=$numTarj;")->fetchAll();
          $id_cuenta  = $objCnt[0][0];
          $id_tarjeta = $objCnt[0][1];

          /* Informacion actual de la cuenta*/
          $json_balance = Cuenta::getBalanceByID($id_cuenta);
          $cntObj    = json_decode($json_balance);

          if ($cntObj[0]->{'estatus'} == "ACTIVA"){
            if ((float)$cntObj[0]->{'balance'} >= $cantRet){
              $folio        = static::folio();
              $date         = static::getDate();
              $balanceFinal = (float)$cntObj[0]->{'balance'} - $cantRet; //Restamos el monto del retiro al valor actual
              $details      = "Se hizo un RETIRO de $cantRet pesos mexicanos a la cuenta con la tarjeta $numTarj ligada.";
              // ---------- Actualizacion de las tablas -----------------------
              // Tabla cuenta
              DatabaseSettings::getConnection()->query("UPDATE `cuenta` SET `balance` = '$balanceFinal' WHERE `cuenta`.`id_cuenta` = $id_cuenta;");
              // Tabla transacciones
              $statement = DatabaseSettings::getConnection()->prepare("INSERT INTO transaccion (folio, fecha, monto, detalles, tipo, id_caja, id_tarjeta)
              VALUES (:var_folio, :var_fecha, :var_monto, :var_detalles, :var_tipo, :var_id_caja, :var_id_tarjeta);");
              $statement->execute(array(
                  "var_folio"     => $folio,
                  "var_fecha"     => $date,
                  "var_monto"     => $cantRet,
                  "var_detalles"  => $details,
                  "var_tipo"      => "RETIRO",
                  "var_id_caja"   => $idCaja,
                  "var_id_tarjeta"=> $id_tarjeta
              ));
              // --------------------------------------------------------------
              return static::successMsg(
                'Fernando Pérez Gómez',
                $numTarj,
                $cntObj[0]->{'estatus'},
                $folio,
                $date,
                $cantRet,
                $details,
                $cntObj[0]->{'balance'},
                $balanceFinal);
            } else { return static::alertMsg("Error: Imposible retirar [$cantRet]. <br /><b>Saldo insuficiente al monto actual</b> [".$cntObj[0]->{'balance'}."]."); }
          } else { return static::alertMsg("Error: La cuenta ligada con la tarjeta <b>$numTarj</b> no se encuentra activa. Imposible realizar cualquier tipo de movimiento."); }
        } else {return static::alertMsg("Error: El PIN no concuerda con el de la tarjeta <b>$numTarj</b> o la tarjeta no se encuentra activa."); }
      } else { return static::alertMsg("Error: La cantidad para el retiro no se encuentra en el rango permitido.".static::RETIRO['min']." - ".static::RETIRO['max']); }


    }
    static public function realizarDeposito($numTarj, $idCaja, $cantDep){
      if ($cantDep >= static::DEPOSITO["min"] && $cantDep <= static::DEPOSITO["max"]){
        $objCnt = DatabaseSettings::getConnection()->query("SELECT id_cuenta, id_tarjeta FROM tarjeta WHERE numero=$numTarj;")->fetchAll();
        if ($objCnt != null){
          $id_cuenta  = $objCnt[0][0];
          $id_tarjeta = $objCnt[0][1];

          /* Informacion actual de la cuenta*/
          $json_balance = Cuenta::getBalanceByID($id_cuenta);
          $cntObj    = json_decode($json_balance);

          if ($cntObj[0]->{'estatus'} == "ACTIVA"){
            $folio        = static::folio();
            $date         = static::getDate();
            $balanceFinal = (float)$cntObj[0]->{'balance'} + $cantDep; //Operacion del deposito
            $details      = "Se hizo un DEPOSITO de $cantDep pesos mexicanos a la cuenta con la tarjeta $numTarj ligada.";
            // ---------- Actualizacion de las tablas -----------------------
            // Tabla cuenta
            DatabaseSettings::getConnection()->query("UPDATE `cuenta` SET `balance` = '$balanceFinal' WHERE `cuenta`.`id_cuenta` = $id_cuenta;");
            // Tabla transacciones
            $statement = DatabaseSettings::getConnection()->prepare("INSERT INTO transaccion (folio, fecha, monto, detalles, tipo, id_caja, id_tarjeta)
            VALUES (:var_folio, :var_fecha, :var_monto, :var_detalles, :var_tipo, :var_id_caja, :var_id_tarjeta);");

            $statement->execute(array(
                "var_folio"     => $folio,
                "var_fecha"     => $date,
                "var_monto"     => $cantDep,
                "var_detalles"  => $details,
                "var_tipo"      => "DEPOSITO",
                "var_id_caja"   => $idCaja,
                "var_id_tarjeta"=> $id_tarjeta
            ));
            // --------------------------------------------------------------
            return static::successMsg(
              'Fernando Pérez Gómez',
              $numTarj,
              $cntObj[0]->{'estatus'},
              $folio,
              $date,
              $cantDep,
              $details,
              $cntObj[0]->{'balance'},
              $balanceFinal);
          } else { return static::alertMsg("Error: La cuenta no se encuentra activa. Imposible realizar cualquier tipo de movimiento."); }
        } else { return static::alertMsg("Error: La cuenta no existe."); }
      } else { return static::alertMsg("Error: La cantidad para el deposito no se encuentra en el rango permitido.".static::DEPOSITO['min']." - ".static::DEPOSITO['max']); }
    }
  }

  /***************************************************************************************/
  $p_numTarjeta = $_POST['num_tarjeta'];
  $p_pinTarjeta = $_POST['pin_tarjeta'];
  $p_monto      = $_POST['monto_operacion'];
  // $p_idCaja     = '1';
  $p_idCaja     = $_SESSION['id_caja'];
  $p_tipoMov    = $_POST['tipo_movimiento'];

  switch ($p_tipoMov) {
    case 'RETIRO':
      echo Caja::realizarRetiro($p_numTarjeta, $p_pinTarjeta, $p_idCaja, $p_monto);
      break;
    case 'DEPOSITO':
      echo Caja::realizarDeposito($p_numTarjeta, $p_idCaja, $p_monto);
      break;
    default:
      echo Caja::alertMsg("Movimiento no especificado");
      break;
  }
  /***************************************************************************************/

?>
