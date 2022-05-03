import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import log from './src/config/logger';
import search from './src/components/search';

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
app.get('/',(req,res) => {
    res.send('GeeksforGeeks');
})
// Agrego rutas
search(app);

app.use('/doc', swaggerUi.serve, swaggerUi.setup('./swagger_output.json'))


const PORT = 3000;
  
app.listen(PORT,() => {
    logger.info(`Running on PORT ${PORT}`);
})