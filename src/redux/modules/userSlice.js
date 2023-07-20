import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  currentUser: null,
  isLogin: null
};

// Slice 생성
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addCurrentUser(state, action) {
      state.currentUser = action.payload.currentUser;
      state.isLogin = action.payload.isLogin;
    }
  }
});

// 내보내기
export const { addCurrentUser } = usersSlice.actions;

// 리듀서를 바깥으로 내보내기
export default usersSlice.reducer;
