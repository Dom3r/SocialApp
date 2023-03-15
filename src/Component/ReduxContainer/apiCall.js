import axios from "axios";
import { loginStart, loginSuccess, loginFailure, logout } from "./userReducer";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/api/user/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const verifyEmail = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/verify/email",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/create/user",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
