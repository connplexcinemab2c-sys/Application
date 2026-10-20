import {combineReducers} from 'redux';
import UserReducer from './userReducer/reducer';

const RootReducer = combineReducers({
  UserReducer,
});

export default RootReducer;
