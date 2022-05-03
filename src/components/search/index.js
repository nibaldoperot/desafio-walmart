import params from "./params";
import SearchController from "./search.controller";
import log from '../../config/logger';

/**
 * Función para búsqueda de productos
 * @param app - Contexto de ejecución de la aplicación 
 */
const search = (app) => {
    const logger = log.logger();
    logger.info('Inicio proceso de búsqueda');
	app.get(params.endpoint, SearchController.search);
};

export default search;
