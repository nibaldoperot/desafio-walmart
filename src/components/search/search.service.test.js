import Product from '../../database/models/Product';
import mocks from './mocks';
import SearchService from './search.service';

let request = {};
beforeEach(() => {
    jest.resetAllMocks();
 });
 

describe('SearchService ', () => {

    it('Éxito al obtener productos', async () => {
        Product.find = jest.fn().mockResolvedValue(mocks.products);
        const service = await SearchService.getAllProducts(request);
        expect(service).toBeDefined();
    });

    it('Error al obtener productos', async () => {
        Product.find = jest.fn().mockRejectedValue({error:'error'});
        try{
            await SearchService.getAllProducts(request);
        }catch(e){
            expect(e).toBeDefined();
        }
    });
});