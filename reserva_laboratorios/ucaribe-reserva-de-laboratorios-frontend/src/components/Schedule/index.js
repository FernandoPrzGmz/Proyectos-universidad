import React from 'react';
import { Grid, Row, Col, } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/es';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Componentes
import Navbar from './../general/Navbar/index';
import LaboratoryData from './LaboratoryData/index';
import UserData from './UserData/index';
// Styles
import { InfoContainer } from './Schedule.styled';

const Schedule = () => {
  return (
    <div>
      <Navbar/>
      <Grid fluid>
        <Row>
          <Col xs={12} md={3} lg={3} xl={3}>
            <InfoContainer>
              <UserData
                userFirstName={'Hector Fernando'}
                userLastName={'Pérez Gómez'}
                userEmail={'fgomez@gmail.com'}
                userType={'Administrador'}
              />
              <hr/>
              <LaboratoryData
                labName={'Laboratiorio de Hardware y cableado'}
                labBuilding={'Edificio de ingenierias'}
                labDescription={'Est cillum non id tempor magna eiusmod consectetur. Labore eu pariatur id sint adipisicing laboris. Et ea tempor ullamco labore dolore proident in sit velit qui. Amet esse consectetur ea irure laboris minim velit do eiusmod.'}
              />
            </InfoContainer>
          </Col>
          
          <Col xs={12} md={9} lg={9} xl={9}>
            <h2 align='center'>Horario</h2>
            <BigCalendar
              localizer={BigCalendar.momentLocalizer(moment)}
              /* Horario de 7 - 22 hrs */
              min={new Date(0,0,0, 7, 0, 0)}
              max={new Date(0,0,0, 22, 0, 0)} 
              /* Fecha por defecto */
              defaultDate={new Date()}
              /* Eventos en el horario */
              events={[]}
              /* Configuraciones de la interfaz */
              views={['work_week', 'week', 'day'/* , 'month', 'agenda' */ ]}
              defaultView="week"
              /* Manejar eventos */
              // onRangeChange={}
              // onSelectEvent={}
              /* Lenguaje */
              culture={'es'}
              messages={{
                allDay   : 'Todo el dia',
                previous : 'Anterior',
                next     : 'Siguiente',
                today    : 'Hoy',
                work_week: 'Lunes a Viernes',
                month    : 'Mes',
                week     : 'Semana',
                day      : 'Dia',
                agenda   : 'Agenda',
                date     : 'Fecha',
                time     : 'Hora',
                event    : 'Evento',
                showMore : (total) => `+ Mostrar más (${total})`
              }}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Schedule;