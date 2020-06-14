import express, { Express } from 'express';
import { __help__ } from '../../controllers';
import { verifyToken } from '../../middleware/authentication.middleware';

const router = express.Router();

module.exports = (app: Express) => {
  //#region Routes
  router.get('/__help__', __help__ );
  //#endregion

  //#region Nested routes
  // ...
  router.use('/me', [
    verifyToken
  ], require('./me/index')(app));
  //#endregion
  return router;
}
