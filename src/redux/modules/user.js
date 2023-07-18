const ADD_TODO = '';

const initialState = [
  {
    currentUser: {
      userid: null,
      email: null,
      password: null
    },
    isSiginup: false
  }
];
//리듀서
const users = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];

    // case 'DELETE_TODO':
    //   return state.filter((users) => users.email !== action.payload);
    default:
      return state;
  }
};

export default users;
