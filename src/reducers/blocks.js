import { GET_BLOCKS_FOR_NODE_START, GET_BLOCKS_FOR_NODE_SUCCESS, GET_BLOCKS_FOR_NODE_FAILURE } from '../constants/actionTypes';
import initialState from './initialState';

export default function blocksReducer(state = initialState().blocks, action) {
  let list, nodeIndex;
  switch (action.type) {
    case GET_BLOCKS_FOR_NODE_START:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.nodeUrl);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            loading: true,
            success: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case GET_BLOCKS_FOR_NODE_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.nodeUrl);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            loading: false,
            success: true,
            data: action.response
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case GET_BLOCKS_FOR_NODE_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.nodeUrl);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
           loading: false,
           success: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    default:
      return state;
  }
}
