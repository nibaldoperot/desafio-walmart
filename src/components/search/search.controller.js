import SearchFacade from "./search.facade";
/**
 * Clase para controlador de búsqueda
 */
class SearchController {

    /**
     * Manejo de llamados a servicios y lógica para hacer la búsqueda
     * @param {JSON} req -  Request ejecutado
     * @param {JSON} res -  Respuesta entregada
     */
    static async search(req, res) {
        res.send(await SearchFacade.search(req));
    }
}

export default SearchController;
