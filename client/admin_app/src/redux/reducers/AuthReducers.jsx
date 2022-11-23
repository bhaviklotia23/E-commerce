import { authConstant } from "../constants";

const initialState = {
  user: [],
  userDetail: [],
  token: "",
  message: []
};

export default function AuthReducer(state = initialState || null, action) {
  switch (action.type) {
    case authConstant.USER_REGISTER:
      return { ...state, user: action?.payload?.data };
    case authConstant.USER_REGISTER_FAILED:
      return { ...state, user: action?.payload };
    case authConstant.GET_USER_PROFILE:
      return { ...state, userDetail: action?.payload?.data };
    case authConstant.USER_LOGIN:
      console.log("action?.payload?.user", action?.payload?.user)
      return { ...state, user: action?.payload?.user };
    case authConstant.USER_LOGIN_FAILED:
      return { ...state, user: action?.payload };
    default:
      return state;
  }
}
