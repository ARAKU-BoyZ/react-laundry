import { combineReducers } from "redux";
import { customerReducer } from "./reducers/customerReducer";
import { authReducer } from "./reducers/authReducer";

export const reducers = combineReducers({
    auth: authReducer,
    customer: customerReducer,
})