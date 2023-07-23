import {
  SET_USER_DATA,
  ADD_USER_DATA,
  UPDATE_USER_DATA,
  DELETE_USER_DATA,
} from './types';

const initState = {
  userData: [], // Initialize as an empty array
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case ADD_USER_DATA:
      return {
        ...state,
        userData: [...state.userData, action.payload],
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: state.userData.map(user => {
          if (user.id === action.payload.id) {
            return {
              ...user,
              ...action.payload,
            };
          } else {
            return user;
          }
        }),
      };
    case DELETE_USER_DATA:
      return {
        ...state,
        userData: state.userData.filter(user => user.id !== action.payload),
      };
    default:
      return state;
  }
};
