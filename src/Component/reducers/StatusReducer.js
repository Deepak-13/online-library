const initialState = {
    status: [],
  };
  
  export const actionTypes = {
    ADD_TO_STATUS: "ADD_TO_STATUS",
    DELETE_FROM_STATUS: "DELETE_FROM_STATUS",
    RESET_STATUS: "RESET_STATUS",
  };
  
  const StatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_TO_STATUS:
        const isPre = state.status.find((i) => i.id === action.payload.item.id);
        return {
          ...state,
          status:
            isPre !== undefined
              ? [...state.status]
              : [...state.status, { ...action.payload.item }],
        };
  
      case actionTypes.DELETE_FROM_STATUS:
        return {
          ...state,
          status: state.status.filter((i) => i.id !== action.payload.item.id),
        };
  
      case actionTypes.RESET_CART:
        return {
          ...state,
          status: [],
        };
  
      default:
        return state;
    }
  };
  
  export default StatusReducer;
  