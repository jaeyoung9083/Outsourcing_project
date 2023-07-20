import { createSlice } from '@reduxjs/toolkit';
// Initial State
const initialState = {
  currentUser: { userid: null, email: null },
  isLogin: false
};
// Slice 생성
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addCurrentUser(state, action) {
      state.currentUser = action.payload.currentUser;
      state.isLogin = action.payload.isLogin;
    }
  }
});
// 내보내기
export const { addCurrentUser } = loginSlice.actions;
// 리듀서를 바깥으로 내보내기
export default loginSlice.reducer;
