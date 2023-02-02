import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReducerPractice from "../reducers/ReducerTemplate";


const rootReducer = combineReducers({
    // add your reducers here
    ReducerPractice,
});

const MyReduxStore = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default MyReduxStore;