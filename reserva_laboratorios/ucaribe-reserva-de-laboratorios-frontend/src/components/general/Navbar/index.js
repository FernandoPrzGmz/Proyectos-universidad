import React from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';
// Styles
import './styles.css';
import { StyledNavbar, ATagNavbar, Text } from './Navbar.styled';

const Navbar = () => {
  return (
    <AutoAffix>
      <StyledNavbar>
        <StyledNavbar.Header>
          <StyledNavbar.Brand>  
            <ATagNavbar href='/'>Reserva Ucaribe</ATagNavbar>
            <br/> {/* No aplica bien el estilo si se borra el elemento */}
          </StyledNavbar.Brand>
          <StyledNavbar.Toggle style={{backgroundColor: 'white'}}/>
        </StyledNavbar.Header>
        <StyledNavbar.Collapse>
          <Nav pullRight >
            <NavDropdown title={'Consulta horarios'} id='nav-dropdown'>
              <MenuItem> qwerty </MenuItem>
              <MenuItem> qwerty </MenuItem>
              <MenuItem> qwerty </MenuItem>
            </NavDropdown>
            <NavItem href='#'><Text> FAQ's    </Text> </NavItem>
            <NavItem href='#'><Text> Contacto </Text> </NavItem>
            <NavItem href='#'><Text> Ingresar </Text> </NavItem>
            <NavItem href='#'><Text> Registro </Text> </NavItem>
          </Nav>
        </StyledNavbar.Collapse>
      </StyledNavbar>
    </AutoAffix>
  );
}

export default Navbar;