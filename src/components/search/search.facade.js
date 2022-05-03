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
        let data = {};
        const { query } = req.params;
        const logger = log.logger();
        let messageCode = '0000';
        try{

            logger.info('Búsqueda de los datos desde MongoDB');
            const dummyDB = await SearchService.search(req).catch(error =>{
                logger.error(error)
                messageCode = '0001';
                data = { ... params.messages[messageCode] };
            });

            if(messageCode !== '0000') return data;

            let products = [];

            // Tipo de búsqeuda por descripción o marca
            if(isNaN(query)){ // eslint-disable-line no-restricted-globals
                logger.info('Búsqueda por producto');
                products = utils.findProduct(dummyDB,query);
            // Tipo de búsqueda por ID
            }else{
                logger.info('Búsqueda por ID');
                products = utils.findProductById(dummyDB,query);
            }
            let prods = products.map(product => {return {...product}})

            // Chequeo condiciones de descuento
            if(isPalindrome(query)){
                logger.info('Aplico descuento palíndromo');
                prods = utils.applyDiscount(prods, process.env.DISCOUNT);
            }

            data = { ... params.messages[messageCode] };
            data.payload = prods;
            // Valido si corresponde a que no hubieron resultados
            if(data.payload.length === 0){
                messageCode = '0003';
                data = { ... params.messages[messageCode] };
            }
        }catch(error){
            logger.error(error);
            messageCode = '0002';
            data = { ... params.messages[messageCode] };
            logger.error({error});
        }

        return data;
        
    }
}

export default SearchFacade;
