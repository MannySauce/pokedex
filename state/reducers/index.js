import {combineReducers} from 'redux';
import catchReducer from './pokemonReducer';

const reducers = combineReducers({
  catch: catchReducer,
});

export default reducers;
