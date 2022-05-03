import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import { config } from 'dotenv';
import log from './src/config/logger';
import search from './src/components/search';
import Connection from './database';

// import './swagger_output.json';
// Configuración dotenv
config();

// Configuración de logger
const loggerMidlleware = expressPinoLogger({
    logger: log.logger()
});
const logger = log.logger();

const app = express();

app.use(loggerMidlleware);

// Agrego rutas
search(app);

// Agrego conexión a Mongo
logger.info('Inicio prueba de conexión a Mongo');
Connection.connect();

const PORT = process.env.PORT;
  
app.listen(PORT,() => {
    logger.info(`Running on PORT ${PORT}`);
})