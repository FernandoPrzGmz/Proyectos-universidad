'use strict';

const graphqlHTTP  = require('express-graphql');
const router       = require('express').Router();
const cors         = require('cors'); // Para que se pueda acceder desde otros origenes
const { deflate }  = require('graphql-deduplicator');

const schema = require('../graphql/');

const extensions = ({ document, variables, operationName, result, context }) =>{
  return ({
    normalizr: deflate(result.data),
  });
}

router.use(cors());
router.use('/', graphqlHTTP({
  schema     : schema,
  graphiql   : true,
  pretty     : true,
  extensions : extensions,
}));

module.exports = router;