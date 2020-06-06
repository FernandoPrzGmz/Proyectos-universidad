import React from 'react';
import PropTypes from 'prop-types';
// Styles
import {InfoTitle, InfoParagraph} from './../Schedule.styled';

const UserData = ({userFirstName, userLastName, userEmail, userType}) => {
  return (
    <div>
      <InfoTitle align='center'>Datos del Encargado</InfoTitle>
      <strong>Nombre:</strong>
      <InfoParagraph>{`${userLastName} / ${userFirstName}`}</InfoParagraph>
      <strong>Correo electronico:</strong>
      <InfoParagraph>{userEmail}</InfoParagraph>
      <strong>Cargo:</strong>
      <InfoParagraph>{userType}</InfoParagraph>
    </div>
  );
};

UserData.propTypes = {
  userFirstName     : PropTypes.string.isRequired,
  userEmail : PropTypes.string.isRequired,
  userType     : PropTypes.string.isRequired,
};

export default UserData;