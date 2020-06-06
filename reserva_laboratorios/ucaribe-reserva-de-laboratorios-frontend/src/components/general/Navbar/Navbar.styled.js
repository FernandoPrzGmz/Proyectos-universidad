import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const StyledNavbar = styled(Navbar)`
  background-color: #2ECFC9;
  padding: 0px;
  margin: 0px;
  z-index: 100;
  border: 0px;
`;

export const ATagNavbar = styled.a`
  color: white;
  &:hover {
    color: white;
  }
`;

export const Text = styled.p`
  color: white;
`;
