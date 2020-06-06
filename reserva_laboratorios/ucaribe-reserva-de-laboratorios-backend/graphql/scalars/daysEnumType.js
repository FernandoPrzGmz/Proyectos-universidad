'use strict';

const {
  GraphQLEnumType
} = require('graphql');


module.exports = new GraphQLEnumType({
    name: 'daysEnumType',
    values: {
      // Los valores de cada dia estan definidos por 
      Domingo:   { value: 0 },
      Lunes:     { value: 1 },
      Martes:    { value: 2 },
      Miercoles: { value: 3 },
      Jueves:    { value: 4 },
      Viernes:   { value: 5 },
      Sabado:    { value: 6 }
    }
  });
