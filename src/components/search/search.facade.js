import isPalindrome from 'is-palindrome-string';
import SearchService from "./search.service";
import utils from "../../utils/utils";
import log from "../../config/logger";
import params from "./params";
/**
 * Clase para controlador de búsqueda
 */
class SearchFacade {

    /**
     * Manejo de llamados a servicios y lógica para hacer la búsqueda
     * @param {JSON} req -  Request ejecutado
     */
    static async search(req) {
        let data;
        const { query } = req.params;
        const logger = log.logger();
        let messageCode = '0000';
        try{

            
            const allProducts = await SearchService.getAllProducts(req).catch(error =>{
                logger.error({error})
                messageCode = '0001';
                data = { ... params.messages[messageCode] };
            });


            if(messageCode !== '0000') return data;

            let products = [];

            // Tipo de búsqeuda por descripción o marca
            if(isNaN(query)){ // eslint-disable-line no-restricted-globals
                // Búsqueda por string debe ser mayor a largo 4
                if(query.length < 4){
                    logger.warn('Búsqueda por texto es demasiado acotada, debe ser de más de 3 carácteres');
                    messageCode = '0004';
                    return { ... params.messages[messageCode] };
                }
                logger.info('Búsqueda por producto');
                products = utils.findProduct(allProducts,query);
            // Tipo de búsqueda por ID
            }else{
                logger.info('Búsqueda por ID');
                products = utils.findProductById(allProducts,query);
            }
            
            // Chequeo condiciones de descuento
            if( isPalindrome(query) || 
                products[0] && isPalindrome(products[0].brand) || 
                products[0] && isPalindrome(products[0].description) ){

                logger.info('Aplico descuento palíndromo');
                products = utils.applyDiscount(products, process.env.DISCOUNT);
            }

            data = { ... params.messages[messageCode] };
            data.payload = products;
            // Valido si corresponde a que no hubieron resultados
            if(data.payload.length === 0){
                messageCode = '0003';
                data = { ... params.messages[messageCode] };
            }
        }catch(error){
            messageCode = '0002';
            data = { ... params.messages[messageCode] };
            logger.error('Error en ejecución de consulta', {error});
        }

        return data;
        
    }
}

export default SearchFacade;
