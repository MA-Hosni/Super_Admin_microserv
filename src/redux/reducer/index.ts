import { combineReducers } from "redux";
import userReducer from './userReducer';
import packReducer from "./packReducer";

const rootReducer = combineReducers({
    user: userReducer,
    plan : packReducer,
});

export default rootReducer;