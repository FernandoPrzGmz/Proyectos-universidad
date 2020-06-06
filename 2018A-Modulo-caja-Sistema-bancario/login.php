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
    <div class="col-md-4 col-md-offset-4">
        <div>
            <div class="row">
                <div class="col-md-12">
                    <h1 class="page-header">Ingresa al sistema</h1>
                </div>
            </div>
            <div class="row">
                <div class="panel">
                    <div class="panel-body">
                        <div>
                            <label>Correo electronico: </label>
                            <input id="login_email" class="form-control" placeholder="correo@dominio.com">
                        </div>
                        <div>
                            <label>Contraseña: </label>
                            <input id="login_password" type="password" class="form-control" placeholder="Contraseña">
                        </div>
                        <br />
                        <button type="submit" class="center btn btn-success" onClick="login();">
                        <!-- <button type="submit" class="btn btn-success" onclick="realizaTransaccion();"> -->

                            Ingresarrrrr
                        </button>

                        <div id="infoLog"></div>
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
