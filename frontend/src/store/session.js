import { useSelector } from "react-redux";
import { csrfFetch } from "./csrf";

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 */

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

export const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (credential, password) => async (dispatch) => {
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const loginDemo = () => async (dispatch) => {
  const res = await csrfFetch("/api/session/demo");
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/session");
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const signup =
  (username, email, password, confirmPassword) => async (dispatch) => {
    const res = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
    });
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
  };

export const logout = () => async (dispatch) => {
  const res = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return res;
};

export const useSessionUser = () => useSelector((state) => state.session.user);
