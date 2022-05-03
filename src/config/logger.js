import pino from 'pino';

/**
 * Función para configurar logger
 * @returns - devuelve logger de pino
 */
function logger(){
    return pino({
        transport: {
            target: 'pino-pretty'
        },
        options: {
            colorize: true
        },
        level: process.env.LOGGERLEVEL
    });
}


export default { logger };
