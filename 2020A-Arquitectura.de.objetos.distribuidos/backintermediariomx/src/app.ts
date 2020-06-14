import express, { Express } from 'express';
import http from 'http';
import cors, { CorsOptions } from 'cors';
import { __help__ } from './controllers';

require('./config/index');

const app: Express = express();
const server =  http.createServer(app);

const corsOptions: CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization'
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  // preflightContinue: false
};

app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//#region Routes
app.get('/__help__', __help__);
//#endregion

//#region Nested routes
app.use(`${process.env.API_PATH }`, require('./routes/index')(app));
//#endregion

server.listen(process.env.PORT, ()=> console.info(`Iniciado en puerto: ${process.env.PORT}`) );
