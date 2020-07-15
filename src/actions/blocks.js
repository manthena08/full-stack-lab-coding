// import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';


const getBlockForNodeStart = (nodeUrl) => {
    return {
        type: types.GET_BLOCKS_FOR_NODE_START,
        nodeUrl
    };
};

const getBlockForNodeFailure = (nodeUrl) => {
    return {
        type: types.GET_BLOCKS_FOR_NODE_FAILURE,
        nodeUrl
    };
};

const getBlockForNodeSuccess = (nodeUrl, response) => {
    return {
        type: types.GET_BLOCKS_FOR_NODE_SUCCESS,
        nodeUrl,
        response
    };
};

/**
 * Make an api call to get the blocks which are specific to the current node url.
 */
export function getBlocksByNodeUrl(nodeUrl) {
    return async (dispatch) => {
        try {
            dispatch(getBlockForNodeStart(nodeUrl));
            const res = await fetch(`${nodeUrl}/api/v1/blocks`);

            if (res.status >= 400) {
                dispatch(getBlockForNodeFailure(nodeUrl));
            }

            const json = await res.json();

            dispatch(getBlockForNodeSuccess(nodeUrl, json.data));
        } catch (err) {
            dispatch(getBlockForNodeFailure(nodeUrl));
        }
    }
}

export function getBlockDetailsSelector(state, nodeUrl){
    const blockData = state.list.find(item => item.url === nodeUrl);
    return blockData ? blockData : [];
}