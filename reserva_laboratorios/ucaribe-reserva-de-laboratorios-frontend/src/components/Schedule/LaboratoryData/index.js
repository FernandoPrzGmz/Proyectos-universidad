import React from 'react';
import PropTypes from 'prop-types';
// Styles
import {InfoTitle, InfoParagraph} from './../Schedule.styled';

const LaboratoryData = ({labName, labBuilding, labDescription}) => {
  return (
    <div>
      <InfoTitle align='center'>Datos del Laboratorio</InfoTitle>
      <strong>Nombre:</strong>
      <InfoParagraph>{labName}</InfoParagraph>
      <strong>Edificio:</strong>
      <InfoParagraph>{labBuilding}</InfoParagraph>
      <strong>Descripcion:</strong>
      <InfoParagraph>{labDescription}</InfoParagraph>
    </div>
  );
};

LaboratoryData.propTypes = {
  labName       : PropTypes.string.isRequired,
  labBuilding   : PropTypes.string.isRequired,
  labDescription: PropTypes.string.isRequired,
};

export default LaboratoryData;