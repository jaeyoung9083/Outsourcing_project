import { configureStore } from '@reduxjs/toolkit';
import users from '../modules/userSlice';
const store = configureStore({
  reducer: {
    users
  }
});
export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import users from '../modules/userSlice';

// const store = configureStore({
//   reducer: {
//     users
//   }
// });

// export default store;
