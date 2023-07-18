// 중앙 데이터 관리소(store)를 설정하는 부분
import { createStore } from 'redux';
// store를 만드는 api

import { combineReducers } from 'redux';
// reducer들을 하나로 묶는 역할 api

import users from '../modules/user';

const rootReducer = combineReducers({
  users: users
});
const store = createStore(rootReducer);

export default store;
