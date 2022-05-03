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
 });
 

describe('SearchFacade ', () => {

    it('Error al leer datos desde mongo', async () => {
        SearchService.search = jest.fn().mockRejectedValue(mocks.errorMongo)
        const facade = await SearchFacade.search(request);
        expect(facade.errorCode).toBe('0001');
    });

    it('Error en ejecución, por falta de query', async () => {
        SearchService.search = jest.fn().mockResolvedValue(mocks.errorMongo)
        const facade = await SearchFacade.search(request);
        expect(facade.errorCode).toBe('0002');
    });

    it('Éxito al buscar productos por marca, descripción con plalíndromo', async () => {
        request.params.query = 'abba';
        SearchService.search = jest.fn().mockResolvedValue(mocks.productos)
        const facade = await SearchFacade.search(request);
        expect(facade.errorCode).toBeUndefined();
        expect(facade.payload.length).toBe(2);
        expect(facade.payload[0].price).toBe(50);
        expect(facade.payload[1].price).toBe(50);
    });

    it('Éxito al buscar productos por id', async () => {
        request.params.query = '1213';
        SearchService.search = jest.fn().mockResolvedValue(mocks.productos)
        const facade = await SearchFacade.search(request);
        expect(facade.errorCode).toBeUndefined();
        expect(facade.payload.length).toBe(1);
    });

    it('Búsqueda sin resultados al buscar productos por id', async () => {
        request.params.query = '12131';
        SearchService.search = jest.fn().mockResolvedValue(mocks.productos)
        const facade = await SearchFacade.search(request);
        expect(facade.message).toBe('No se encontraron resultados');
    });
});
