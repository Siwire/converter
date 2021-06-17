import { combineReducers } from 'redux';
import converterReducer from './converterReducer';

const createRootReducer = (history) => combineReducers({
    converter: converterReducer,
});

export default createRootReducer;