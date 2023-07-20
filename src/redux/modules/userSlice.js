import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  currentUser: { VBArray, userid: null, email: null },
  isLogin: false
};

// Slice 생성
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addCurrentUser(state, action) {
      state.currentUser = action.payload.currentUser;
      state.isLogin = action.payload.isLogin;
    },
    updateCurrentUser(state, action) {
      state.currentUser = { ...state.currentUser, ...action.payload };
    }
  }
});

// 내보내기
export const { addCurrentUser, updateCurrentUser } = usersSlice.actions;

// 리듀서를 바깥으로 내보내기
export default usersSlice.reducer;
