import React, {Component} from 'react';
import {
  Grid, Row, Col,
  FormGroup, ControlLabel, HelpBlock, FormControl, InputGroup,
} from 'react-bootstrap';
// Components
import Navbar from './../general/Navbar/index';
// Sevices
import { nameValidation, teacherEnrollmentValidation, passwordValidation } from './../../services/signUpValidations';
// Styles
import {
  PreviewImg, TextOverflow,
  FormTitle, InfoContainer, InfoLinks, Button,
} from './SignUp.styled';

class SignUp extends Component {
  constructor () {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      // valor de los inputs
      enrollment : null,
      firstName  : null,
      lastName   : null,
      password   : null,
      // validaciones
      enrollmentValidationState : null,
      firstNameValidationState  : null,
      lastNameValidationState   : null,
      passwordValidationState   : null,
    };
  }

  /**
   * Se obtiene un evento que es la etiqueta input y se cambian los valores en el state segun
   * el prop name de la etiqueta y el valor que tiene.
   * @param {*} event 
   */
  handleChange (event) {
    switch (event.target.name) {
      case 'enrollment':
        this.setState({
          [event.target.name]      : event.target.value,
          enrollmentValidationState: teacherEnrollmentValidation(event.target.value)
        });
        break;

      case 'firstName':
        this.setState({
          [event.target.name]     : event.target.value,
          firstNameValidationState: nameValidation(event.target.value, true)
        });
        break;

      case 'lastName':
        this.setState({
          [event.target.name]    : event.target.value,
          lastNameValidationState: nameValidation(event.target.value, true)
        });
        break;
        
      case 'password':
        this.setState({
          [event.target.name]    : event.target.value,
          passwordValidationState: passwordValidation(event.target.value, true)
        });
        break;

      default:
        break;
    }
  }

  render(){
    const {
      enrollment, firstName, lastName,
      enrollmentValidationState, firstNameValidationState, lastNameValidationState, passwordValidationState   
    } = this.state;
    return (
      <div>
        <Navbar/>
        <Grid fluid>
          <FormTitle>Datos del docente</FormTitle>
          <Row>
            <Col xs={10}    sm={8}     md={4}     lg={4}
                 xsPush={1} smPush={2} mdPush={4} lgPush={4}>
              <Col xs={3} sm={3} md={3} lg={3}>
                <PreviewImg src='assets/img/2018/default-pp.png' alt=''/>
              </Col>
  
              <Col xs={9} sm={9} md={9} lg={9}>
                Nombre:
                <strong>
                  <TextOverflow>{`${lastName || ''} / ${firstName || ''}`}</TextOverflow>
                </strong> 
                Correo electrónico:
                <TextOverflow>{`${enrollment || ''}@ucaribe.edu.mx`}</TextOverflow>
              </Col>
              <small>Anuncio: Por el momento no es posible cargar o elegir una foto de perfil.</small>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col xs={10}    sm={8}     md={4}     lg={4}
                 xsPush={1} smPush={2} mdPush={4} lgPush={4} >
              <form>
                <FormGroup validationState={ enrollmentValidationState ? enrollmentValidationState.rbState : null }>
                  <ControlLabel>Correo electrónico:</ControlLabel>
                  <HelpBlock>Sin escribir '@ucaribe.edu.mx'</HelpBlock>
                  <InputGroup>
                    <FormControl type='text' name='enrollment' onChange={this.handleChange}/>
                    <InputGroup.Addon>@ucaribe.edu.mx</InputGroup.Addon>
                  </InputGroup>
                  {
                    // Mostrar mensaje de error
                    enrollmentValidationState
                    ? (!enrollmentValidationState.state ? <HelpBlock>{`Error: ${enrollmentValidationState.message}`}</HelpBlock> : null)
                    : null
                  }
                </FormGroup>
  
                <FormGroup validationState={ firstNameValidationState ? firstNameValidationState.rbState : null }>
                  <ControlLabel>Nombre(s):</ControlLabel>
                  <FormControl type='text' name='firstName' onChange={this.handleChange}/>
                  <FormControl.Feedback />
                  {
                    // Mostrar mensaje de error
                    firstNameValidationState
                    ? (!firstNameValidationState.state ? <HelpBlock>{`Error: ${firstNameValidationState.message}`}</HelpBlock> : null)
                    : null
                  }
                </FormGroup>
  
                <FormGroup validationState={ lastNameValidationState ? lastNameValidationState.rbState : null }>
                  <ControlLabel>Apellidos:</ControlLabel>
                  <FormControl type='text' name='lastName' onChange={this.handleChange}/>
                  <FormControl.Feedback />
                  {
                    // Mostrar mensaje de error
                    lastNameValidationState
                    ? (!lastNameValidationState.state ? <HelpBlock>{`Error: ${lastNameValidationState.message}`}</HelpBlock> : null)
                    : null
                  }
                </FormGroup>
  
                <FormGroup validationState={ passwordValidationState ? passwordValidationState.rbState : null }>
                  <ControlLabel>Crear una contraseña:</ControlLabel>
                  <FormControl type='password' name='password' onChange={this.handleChange}/>
                  <FormControl.Feedback />
                  {
                    // Mostrar mensaje de error
                    passwordValidationState
                    ? (!passwordValidationState.state ? <HelpBlock>{`Error: ${passwordValidationState.message}`}</HelpBlock> : null)
                    : null
                  }
                </FormGroup>
  
  
                <Button href='/'>Regístrate</Button>
  
                <InfoContainer>
                  ¿Ya tienes una cuenta? <a href='/'>Inicia sesión</a>
                </InfoContainer>
              </form>
              <InfoContainer>
                <InfoLinks>Home</InfoLinks>
              </InfoContainer>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
 
export default SignUp;