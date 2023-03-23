const initialState = {
    url: ''
  };
  
  export const actionTypes = {
    ADD_TO_READ: "ADD_TO_READ",
    DELETE_FROM_READ: "DELETE_FROM_READ",
    RESET_READ: "RESET_READ"
  };
  
  const ReadReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_TO_READ:
        return {
          ...state,
          url:
             state.url = action.payload.item
        };
  
      case actionTypes.DELETE_FROM_READ:
        return {
          ...state,
          read: state.read.filter((i) => i.id !== action.payload.item.id),
        };
  
      case actionTypes.RESET_READ:
        return {
          ...state,
          read: [],
        };

  
      default:
        return state;
    }
  };
  
  export default ReadReducer;
  