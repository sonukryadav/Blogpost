import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    // add your reducers here
});

const MyReduxStore = createStore(rootReducer, applyMiddleware(thunk, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default MyReduxStore;