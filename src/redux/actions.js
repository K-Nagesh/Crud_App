import {
  SET_USER_DATA,
  ADD_USER_DATA,
  UPDATE_USER_DATA,
  DELETE_USER_DATA,
} from './types';

export const setUserData = data => ({
  type: SET_USER_DATA,
  payload: data,
});

export const updateUserData = data => ({
  type: UPDATE_USER_DATA,
  payload: data,
});

export const deleteUserData = id => ({
  type: DELETE_USER_DATA,
  payload: id,
});

export const addUserData = data => ({
  type: ADD_USER_DATA,
  payload: data,
});

// Fetch data from API and set it to the Redux store
export const fetchUserDataFromAPI = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
      dispatch(setUserData(data));
    })
    .catch(err => {
      console.log('Error fetching data from API:', err);
    });
};
