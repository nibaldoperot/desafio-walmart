import SearchController from './search.controller';
import mocks from './mocks';
import SearchFacade from './search.facade';

const getMock = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

const res = getMock();


const request = {};
beforeEach(() => {
    jest.clearAllMocks();
    process.env.LOGGERLEVEL = 'error';
 });
 

describe('SearchController ', () => {

    it('Envía información obtenida desde facade', async () => {
        SearchFacade.search = jest.fn().mockResolvedValue(mocks.productos)
        await SearchController.search(request, res);
        expect(res).toBeDefined();
    });
});
