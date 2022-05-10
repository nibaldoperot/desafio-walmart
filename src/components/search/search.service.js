import log from "../../config/logger";
import Product from '../../database/models/Product';


/**
 * Clase para servicios asociados a ls búsqueda
 */
class SearchService {

    /**
     * Función para hacer búsqueda dentro de mongo db
     * @param {JSON} req - Valor asociado al request utilizado 
     * @returns 
     */
    static async getAllProducts() {
        const logger = log.logger();
        logger.info('Búsqueda de los datos desde MongoDB');
        try{
            const products = await Product.find();
            return products;
        }catch(err){
            logger.error('Error al encontrar datos en MongoDB', {err})
            throw err;
        }
    }
}

export default SearchService;