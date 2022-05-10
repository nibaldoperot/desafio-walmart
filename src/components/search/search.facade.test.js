import mocks from './mocks';
import SearchFacade from './search.facade';
import SearchService from './search.service';


let request = {};
beforeEach(() => {
    jest.clearAllMocks();
    request = {
        params: {
            query: 'abba'
        }
    };
    process.env.LOGGERLEVEL = 'error';
    process.env.DISCOUNT = 0.5;
 });
 

describe('SearchFacade ', () => {

    it('Error al leer datos desde mongo', async () => {
        SearchService.getAllProducts = jest.fn().mockRejectedValue(mocks.errorMongo)
        const facade = await SearchFacade.search(request);
        expect(facade.errorCode).toBe('0001');
    });

    it('Error en ejecución, por falta de query', async () => {
        SearchService.getAllProducts = jest.fn().mockResolvedValue(mocks.errorMongo)
        const facade = await SearchFacade.search(request);
        expect(facade.errorCode).toBe('0002');
    });

    it('Éxito al buscar productos por marca, descripción con plalíndromo', async () => {
        request.params.query = 'abbba';
        SearchService.getAllProducts = jest.fn().mockResolvedValue(mocks.products)
        const facade = await SearchFacade.search(request);
        expect(facade.errorCode).toBeUndefined();
        expect(facade.payload[0].price).toBe(50);
    });

    it('Éxito al buscar productos por marca, búsqueda menor a 4 caracteres', async () => {
        request.params.query = 'abb';
        SearchService.getAllProducts = jest.fn().mockResolvedValue(mocks.products)
        const facade = await SearchFacade.search(request);
        expect(facade.errorCode).toBe('0004');
    });

    it('Éxito al buscar productos por id', async () => {
        request.params.query = '1213';
        SearchService.getAllProducts = jest.fn().mockResolvedValue(mocks.products)
        const facade = await SearchFacade.search(request);
        expect(facade.errorCode).toBeUndefined();
        expect(facade.payload.length).toBe(1);
    });

    it('Búsqueda sin resultados al buscar productos por id', async () => {
        request.params.query = '12131';
        SearchService.getAllProducts = jest.fn().mockResolvedValue(mocks.products)
        const facade = await SearchFacade.search(request);
        expect(facade.message).toBe('No se encontraron resultados');
    });
});
