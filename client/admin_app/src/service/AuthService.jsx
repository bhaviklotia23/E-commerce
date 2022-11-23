import { endpoints } from "../utils/endPoints";
import { doGet, doPost } from "./commonSer";

export const Register = (payload) => {
  const register = doPost(endpoints.AUTH_REGISTER, payload);
  return register;
};

export const getProfile = (payload) => {
  console.log("--   payload", payload);
  const profile = doGet(endpoints.GET_USER_PROFILE, payload);
  return profile;
};
export const LoginApi = (payload) => {
  const login = doPost(endpoints.AUTH_LOGIN, payload);
  return login;
};
