import express, { Express } from 'express';
import { verifyToken } from '../middleware/authentication.middleware';
import { __help__ } from './../controllers/index';

const router = express.Router();

module.exports = (app: Express) => {
  //#region Routes
  router.get('/__help__', __help__);
  //#endregion

  //#region Nested routes
  router.use('/user', require('./user/index')(app));
  router.use('/publication', require('./publication/index')(app));
  router.use('/booking', require('./booking/index')(app));
  //#endregion
  return router;
}
