import dummy from '../../database/dummy';
import log from "../../config/logger";
import mongoose from 'mongoose';
/**
 * Clase para servicios asociados a ls búsqueda
 */
class SearchService {

    /**
     * Función para hacer búsqueda dentro de mongo db
     * @param {JSON} req - Valor asociado al request utilizado 
     * @returns 
     */
    static async search() {
        const logger = log.logger();
        logger.info('consumo datos desde servicio');

        console.log({ models: mongoose.models});
        return dummy.productos;
        
    }
}

export default SearchService;
