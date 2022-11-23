import { Register, getProfile, LoginApi } from "../../service/AuthService";
import Cookies from "js-cookie";
import { authConstant } from "../constants";

export const RegisterUser = (payload) => (dispatch) => {
  return Register(payload)
    .then((response) => {
      const token = response.token;
      console.log("token", token);
      Cookies.set("token", token);
      dispatch({
        type: authConstant.USER_REGISTER,
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({
        type: authConstant.USER_REGISTER_FAILED,
        payload: "Delete"
      });
    })
    .finally(() => {});
};

export const getUserProfile = (payload) => (dispatch) => {
  return getProfile(payload)
    .then((response) => {
      dispatch({
        type: authConstant.GET_USER_PROFILE,
        payload: response
      });
    })
    .catch((error) => {
      dispatch({
        type: authConstant.GET_USER_PROFILE_FAILED,
        payload: error
      });
    });
};

export const Logins = (payload) => (dispatch) => {
  return LoginApi(payload)
    .then((res) => {
      const token = res.token;
      Cookies.set("token", token);
      dispatch({
        type: authConstant.USER_LOGIN,
        payload: res
      });
    })
    .catch((error) => {
      dispatch({
        type: authConstant.USER_LOGIN,
        payload: error
      });
    });
};
