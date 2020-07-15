import * as ActionTypes from '../constants/actionTypes';
import reducer from './blocks';
import initialState from './initialState';


describe('Reducers::Blocks', () => {
    const getInitialState = () => {
        return initialState().blocks;
    };

    const blockA = {
        url: 'http://localhost:3002',
        loading: false,
        success: false,
        data: []
    };

    const blockB = {
        url: 'http://localhost:3003',
        loading: false,
        success: false,
        data: []
    };

    it('should set initial state by default', () => {
        const action = { type: 'unknown' };
        const expected = getInitialState();

        expect(reducer(undefined, action)).toEqual(expected);
    });

    it('should handle GET_BLOCKS_FOR_NODE_START', () => {
        const appState = {
            list: [blockA, blockB]
        };
        const action = { type: ActionTypes.GET_BLOCKS_FOR_NODE_START, nodeUrl: blockA.url };
        const expected = {
            list: [
                {
                    ...blockA,
                    loading: true
                },
                blockB
            ]
        };
        const output = reducer(appState, action);
        expect(output).toEqual(expected);
    });

    it('should handle CHECK_NODE_STATUS_SUCCESS', () => {
        const appState = {
            list: [blockA, blockB]
        };
        const action = { type: ActionTypes.GET_BLOCKS_FOR_NODE_SUCCESS, response: { data: 'alpha' }, nodeUrl : blockA.url };
        const expected = {
            list: [
                {
                    ...blockA,
                    data: { data: 'alpha' },
                    loading: false,
                    success: true
                },
                blockB
            ]
        };

        expect(reducer(appState, action)).toEqual(expected);
    });

    //   it('should handle CHECK_NODE_STATUS_FAILURE', () => {
    //     const appState = {
    //       list: [
    //         {
    //           ...nodeA,
    //           online: true,
    //           name: 'alpha',
    //           loading: false
    //         },
    //         nodeB
    //       ]
    //     };
    //     const action = { type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA };
    //     const expected = {
    //       list: [
    //         {
    //           ...nodeA,
    //           online: false,
    //           name: 'alpha',
    //           loading: false
    //         },
    //         nodeB
    //       ]
    //     };

    //     expect(reducer(appState, action)).toEqual(expected);
    //   });
});
