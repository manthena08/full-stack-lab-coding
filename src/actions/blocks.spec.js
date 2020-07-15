import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './blocks'
import * as types from '../constants/actionTypes';
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async blocks actions', () => {
    const nodeUrl = 'sampleUrl';
    const mockApiResponse = {
        data: []
    }
    afterEach(() => {
        fetchMock.restore()
    })

    it('get blocks data specific to node - success path', () => {
        fetchMock.getOnce(`/${nodeUrl}/api/v1/blocks`, {
            body: mockApiResponse,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            {
                type: types.GET_BLOCKS_FOR_NODE_START,
                nodeUrl
            },
            {
                type: types.GET_BLOCKS_FOR_NODE_SUCCESS,
                nodeUrl,
                response: []
            }
        ]
        const store = mockStore({
            blocks: {
                list: [
                ]
            }
        })

        return store.dispatch(actions.getBlocksByNodeUrl(nodeUrl)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})