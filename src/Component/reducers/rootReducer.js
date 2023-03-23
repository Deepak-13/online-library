import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import CartReducer from "./CartReducer";
import StatusReducer from "./StatusReducer";
import CompletedReducer from "./CompletedReducer";
import ReadReducer from "./ReadReducer";

const rootReducer = combineReducers({
  loginReducer: LoginReducer,
  cartReducer: CartReducer,
  statusReducer: StatusReducer,
  completedReducer:CompletedReducer,
  readReducer:ReadReducer
});

export default rootReducer;
