import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
// Components
import Navbar from './../general/Navbar/index';
// Styles
import {
  HeaderContainer, HeaderTop, HeaderTopH1, HeaderTopImg, HeaderCardContent, HeaderCardContentImg, HeaderCardContentButton,
  StyledRow, SectionContainer, SectionContainerImg, SectionContainerH3, SectionCover,
} from './Home.styled';

const Home = () => {
  return (
    <div>
      <HeaderContainer>
        <HeaderTop>
          <a href='/'>
            <HeaderTopH1>Sistema de Reserva de Laboratorios</HeaderTopH1>
          </a>
          <HeaderTopImg src='assets/img/2018/logo-universidad-del-caribe.png' alt='Logo unicaribe'/>
        </HeaderTop>
        
        <HeaderCardContent>
          <HeaderCardContentImg src='assets/img/2018/hunab-ku.png' alt='logo hunab-ku'/>
          <h2>Reserva un laboratorio disponible para tu proxima asignatura.</h2>
          <HeaderCardContentButton href='/'> Ir al Sistema</HeaderCardContentButton>
        </HeaderCardContent>
      </HeaderContainer>

      <Navbar/>

      <Grid fluid>
        <StyledRow>
          <SectionContainer>
            <Col xs={12} md={6}>
              <SectionContainerImg src='assets/img/2018/hunab-ku.png' alt='logo hunab-ku'/>
            </Col>
            <Col xs={12} md={6}>
              <SectionContainerH3>Reserva donde quiera que estes</SectionContainerH3>
              <p> El sistema de reserva de laboratorios te ofrece la facilidad y rapidez de reservar un laboratorio parar impartir tus clases. </p>
              <p> De esta forma reducimos el tiempo de espera aumentamos tu productividad. </p>
            </Col>
          </SectionContainer>
        </StyledRow>

        <Row> <SectionCover urlImage={'assets/img/2018/home-01.jpg'}/> </Row>
        
        <StyledRow>
          <SectionContainer>
            <Col xs={12} md={6}>
              <SectionContainerH3>Consulta los horarios del laboratorio</SectionContainerH3>
              <p>Puedes acceder a los horarios de los diferentes laboratorios desde cualquier smartphone, tablet u ordenador.
                Asi podras conocer en que horarios se ocupan.</p>
            </Col>
            <Col xs={12} md={6}>
              <SectionContainerImg src='assets/img/2018/hunab-ku.png' alt='logo hunab-ku'/>
            </Col>
          </SectionContainer>
        </StyledRow>

        <Row> <SectionCover urlImage={'assets/img/2018/home-01.jpg'}/> </Row>
    
      </Grid>
      Hola mundo
    </div>
  );
};

export default Home;