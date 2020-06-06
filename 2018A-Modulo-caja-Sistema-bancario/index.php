<?php
    session_start();
    if(!isset($_SESSION['id_caja'])){
        header('Location: login.php');
    }
?>
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <link href="content/css/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="content/css/sb-admin-2.css" rel="stylesheet">
    <title>Caja</title>
</head>

<body>

    <div class="col-md-10 col-md-offset-1">
        <div class="row">
            <div class="col-md-12">
                <h1 class="page-header">Movimientos de Caja</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Realiza Depositos y Retiros en Caja
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Tipo de movimiento:</label>
                                        <select id="tipo_mov" class="form-control" onclick="selectAction()">
                                            <option value="RETIRO">RETIRO</option>
                                            <option value="DEPOSITO">DEPOSITO</option>
                                        </select>
                                    </div>
                                    <label>Monto:<small>(Pesos Mexicanos)</small></label>
                                    <div class="form-group input-group">
                                        <span class="input-group-addon">$</span>
                                        <input onChange="inpMonto($('#monto_operacion'))" id="monto_operacion" type="text" class="form-control">
                                        <span class="input-group-addon">MXN</span>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Número de tarjeta: <small>(16 números)</small></label>
                                        <input onChange="inputsTarj($('#num_tarjeta'))"id="num_tarjeta" class="form-control" placeholder="XXXX-XXXX-XXXX-XXXX">
                                    </div>
                                    <div id="view_pin"class="form-group">
                                        <label>Pin de tarjeta: <small>(4 números)</small></label>
                                        <input onChange="inputsTarj($('#pin_tarjeta'))"id="pin_tarjeta" type="password" class="form-control" placeholder="">
                                    </div>

                                    <button type="submit" class="btn btn-success" onclick="realizaTransaccion();">
                                        Realizar Transacción
                                    </button>
                                </div>
                                <div id="infoError" class="col-md-12"></div>
                            </div>
                            <div class="col-md-6 col-xs-12"><span id="infoMov"></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="content/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="content/js/actions.js"></script>
    <script src="content/css/bootstrap/js/bootstrap.min.js"></script>

</body>
</html>
