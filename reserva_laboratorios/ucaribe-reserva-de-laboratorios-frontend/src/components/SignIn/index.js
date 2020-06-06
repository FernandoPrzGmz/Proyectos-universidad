import React from 'react';
import {
  Grid, Row, Col,
  FormGroup, ControlLabel, HelpBlock, FormControl, InputGroup,
} from 'react-bootstrap';
// Styles
import {
  SignInContainer, FormContainer, FormTitle, InfoContainer, InfoLinks, Button,
} from './SignIn.styled';

const SignIn = () => {
  return (
    <Grid fluid style={{padding: '0px'}}>
      <SignInContainer urlImage={'assets/img/2018/home-02.jpg'}/>
        <Row>
          <Col xs={10}    sm={8}     md={4}     lg={4}
               xsPush={1} smPush={2} mdPush={4} lgPush={4} >
            <FormContainer>
              <form>
                <FormTitle>Iniciar Sesión</FormTitle>

                <FormGroup validationState={null}>
                  <ControlLabel>Correo electrónico:</ControlLabel>
                  <InputGroup>
                    <FormControl type='text' />
                    <InputGroup.Addon>@ucaribe.edu.mx</InputGroup.Addon>
                  </InputGroup>
                  <HelpBlock>Sin escribir '@ucaribe.edu.mx'</HelpBlock>
                </FormGroup>

                <FormGroup validationState={null}>
                  <ControlLabel>Contraseña:</ControlLabel>
                  <FormControl type='password' />
                  <FormControl.Feedback />
                </FormGroup>
                <Button href='/'>Sign in</Button>

                <InfoContainer>
                  <a href='/'>Crear una cuenta</a> | <a href='/'>¿Olvidaste tu contraseña?</a>
                </InfoContainer>
              </form>
            </FormContainer>

            <InfoContainer>
              <InfoLinks>Home</InfoLinks>
            </InfoContainer>
          </Col>
        </Row>
      {/* </SignInContainer> */}
    </Grid>
  );
}
 
export default SignIn;