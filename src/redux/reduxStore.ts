import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import authReducer from "./authReducer";

let rootReducer = combineReducers({
    auth: authReducer,
    profileReducer: profileReducer,
    usersReducer: usersReducer,
    form: formReducer
});
// @ts-ignore
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware)
);
let store = createStore(rootReducer, enhancer);

//export type AppStoreType = typeof store;
export type AppState = ReturnType<typeof rootReducer>
//window.store = store;
export type InferedActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, P=void> = ThunkAction<P, AppState, unknown, A>
export default store;