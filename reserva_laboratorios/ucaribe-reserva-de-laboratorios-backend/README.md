# Backend - Sistema de reserva de laboratorios

## Motivacion

Cada laboratorio del área de ciencias básicas e ingenierías de la universidad del caribe está implementado para apoyar en la impartición de asignaturas de los diferentes programas educativos del DCBeI. Cada semestre son asignadas horas de clases en los laboratorios (clases asignadas), a pesar de esto existen solicitudes que realizan los profesores para que se les asignen horas en el laboratorio y se reserve el espacio durante todo el semestre (solicitudes semestrales), además existen reservas temporales que realizan algunos profesores sólo para realizar prácticas o hacer uso de los laboratorios, es decir sólo se hace uso del laboratorio por ese horario reservado y en cuanto pasa la fecha solicitada se libera el espacio (Solicitudes temporales).

Es importante mencionar que cada laboratorio tiene un responsable de laboratorio, un responsable de laboratorio puede tener varios laboratorios asignados pero cada laboratorio sólo debe tener un responsable.

Actualmente el registro y control de los horarios y las solicitudes de los laboratorios se lleva de la siguiente manera:

1. Se espera a que salgan las __clases asignadas__ mediante SIGMAA:
    - Son las clases que desde el inicio se pensaron para impartirse en un laboratorio y se les asigna un espacio desde el primer día de clases hasta el último. Estos espacios se reservan en una hoja de cálculo online por cada uno de los laboratorios una clase a la vez y se sombrean de color amarillo. Este trabajo lo hace un becario, le pasan impresos los horarios que asignó SIGMA y el becario crea la hoja de cálculo donde cada pestaña es un laboratorio, arma la matriz de días con horas y va rellenando cada espacio de clase asignada por laboratorio. Esto tarda alrededor de 3 a 4 días para realizarse, ya que en cada clase debe escribirse el nombre del profesor y la clase que se impartirá.

2. Se reciben las __solicitudes semestrales__:
    - Son los profesores que no les asignaron horas de laboratorio mediante SIGMA pero que necesitan impartir sus clases en un laboratorio. Ellos envían un correo al responsable del laboratorio que desean reservar durante todo el semestre y esperan que se les confirme que podrán utilizar el laboratorio, se les informa a partir de que día lo pueden comenzar a utilizar y esta reservación se respeta a lo largo del semestre. Este punto es donde surge todo el caos, ya que a veces para que todos los profesores puedan impartir sus clases en laboratorios, se tienen que mover clases asignadas por SIGMAA para darle espacio a otros profesores e incluso redirigir profesores de un laboratorio a otro. Para estas solicitudes de igual forma se llena en la misma hoja de cálculo los horarios de las materias una por una y se sombrean de azul.
3. __Solicitudes temporales__.
    - Son las que realizan los profesores para utilizar sólo por cierto tiempo un laboratorio, sólo lo utilizan esa fecha y hora y posterior a esto el laboratorio vuelve a quedar disponible. Actualmente estás se colocan en la hoja de cálculo rellenadas de color verde. La cuestión con estas reservas es que se colocan y se quitan, por lo que el registro de todas las solicitudes temporales del semestre se deben llevar en una hoja de cálculo aparte.

## Justificación de Proyecto
Con la realización de este sistema se busca disminuya el tiempo que se necesita para dar de alta los registros de clases asignadas a los laboratorios, que todos los alumnos y profesores con acceso a la página principal puedan ver los horarios de laboratorios y saber cuándo están disponibles los laboratorios, además de automatizar el proceso de reserva de laboratorio y aligerar el trabajo a los profesores responsables de laboratorios para que ya sólo realicen a autorización o rechazo de la solicitud de reserva con un clic. Otro punto importante es que llevará un mejor control de las solicitudes temporales que se realizan a lo largo del semestre, además que gracias al sistema se podrán ver reportes de las horas de uso que se le dio al laboratorio y hasta obtener algunas gráficas.

## Requerimientos:
### Generales:
- Todos los usuarios con el link de la página de inicio del sistema tendrán acceso a los horarios de cada laboratorio, sólo podrán visualizar la información.
- El sistema debe contar con un inicio de sesión para cada uno de los tipos de usuarios diferentes, donde ingresen su matrícula y una contraseña.

### Módulo Administrador
El sistema debe permitir al administrador del sistema realizar lo siguiente:
- Registro de los usuarios: Responsable de laboratorio, becario y profesor.
- Modificar datos de: Responsable de laboratorio, becario y profesor.
- Eliminar: Responsables de laboratorio, becario y profesor.
- Dar de alta, modificar y eliminar asignaturas y laboratorios.
- Visualizar la lista de usuarios filtrada por tipo de usuarios.
- Visualizar la lista de laboratorios y seleccionar un laboratorio para ver todas las reservas de ese laboratorio.
- Filtrar las visualizaciones de las reservas por asignadas, solicitadas y temporales.
- Visualizar el historial de las solicitudes temporales por laboratorio dentro de un rango de fechas.
- Obtener reportes y gráficas de las reservas de los laboratorios dentro de un rango de fechas.

### Módulo de Responsable de laboratorio
El sistema debe permitir al responsable de laboratorio realizar lo siguiente:
- Visualizar sus datos de registro.
- Modificar algunos datos del perfil como: celular y fotografía.
- Reservar laboratorios: Podrá hacer una nueva reserva de laboratorio, modificar una reserva y eliminar una reserva. (Reservas de cualquier tipo)
- Aceptar o rechazar una solicitud de reserva realizada por algún profesor.
- Visualizar el historial de las solicitudes temporales de su laboratorio dentro de un rango de fechas.
- Obtener reportes y gráficas de las reservas de su laboratorio dentro de un rango de fechas. (Cantidad de horas que fue usado el laboratorio en ese lapso de tiempo)
- Visualizar los horarios de los diferentes laboratorios.

### Módulo de Becario
El sistema permitirá al usuario Becario realizar lo siguiente:
- Visualizar sus datos de registro.
- Modificar algunos datos del perfil como: celular y fotografía.
- Reservar laboratorios: Podrá hacer una nueva reserva de laboratorio, modificar una reserva y eliminar una reserva. (Sólo reservas asignadas por SIGMA)
- Dar de alta una asignatura y editarla.
- Dar de alta un profesor.
- Visualizar los horarios de los diferentes laboratorios.

### Módulo de Profesor
El sistema debe permitir al usuario profesor realizar lo siguiente:
- Registrarse al sistema. Nombre completo, matrícula de empleado, correo institucional.
- Visualizar sus datos de registro.
- Modificar algunos datos del perfil como: celular y fotografía.
- Realizar una solicitud de reserva de laboratorio semestral o temporal. (Esta solicitud debe aprobarse por el responsable del laboratorio y en caso de rechazarse indicar el motivo).
- El sistema notificará al profesor si su solicitud fue aprobada o rechazada por el responsable de laboratorio.
- Visualizar los horarios de los diferentes laboratorios.