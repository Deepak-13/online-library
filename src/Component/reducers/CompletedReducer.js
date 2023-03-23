const initialState = {
    comp: [],
  };
  
  export const actionTypes = {
    ADD_TO_COMP: "ADD_TO_COMP",
    DELETE_FROM_COMP: "DELETE_FROM_COMP",
    RESET_COMP: "RESET_COMP",
  };
  
  const CompletedReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_TO_COMP:
        const isPre = state.comp.find((i) => i.id === action.payload.item.id);
        return {
          ...state,
          comp:
            isPre !== undefined
              ? [...state.comp]
              : [...state.comp, { ...action.payload.item }],
        };
  
      case actionTypes.DELETE_FROM_COMP:
        return {
          ...state,
          comp: state.comp.filter((i) => i.id !== action.payload.item.id),
        };
  
      case actionTypes.RESET_COMP:
        return {
          ...state,
          comp: [],
        };
  
      default:
        return state;
    }
  };
  
  export default CompletedReducer;
  