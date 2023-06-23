import { Actions, AxiosConfig } from "src/configs";
import axios from "axios";
import { getToken } from "src/services/auth";
import { isExpired, decodeToken } from "react-jwt";
require("dotenv").config();

export function login(data) {
  // console.log(data);
  return async function loginThunk(dispatch, getState) {
    if (data.accessToken) {
      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
        data.accessToken
      );
      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`,
        data.refreshToken
      );
      let decodedData = decodeToken(data.accessToken);
      dispatch({
        type: Actions.LOGIN_SUCCESS,
        payload: {
          user: decodedData,
          status: 200,
          message: "Login successfully",
        },
      });
    } else {
      dispatch({
        type: Actions.LOGIN_FAIL,
        payload: {
          status: 400,
          message: data?.message || "Login failed",
        },
      });
    }
  };
}

export function changeLanguage(languages, callback) {
  return async function languageThunk(dispatch, getState) {
    dispatch({
      type: Actions.CHANGE_LANGUAGE_SUCCESS,
      payload: {
        language: languages,
        message: "",
      },
    });
  };
}

export function logout() {
  return async function logoutThunk(dispatch, getState) {
    const axiosConfig = AxiosConfig();
    axiosConfig
      .post(`${process.env.REACT_APP_API}auth/logout`)
      .then((res) => {
        localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`);
        localStorage.removeItem(
          `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`
        );
        localStorage.removeItem(
          `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
        );
        if (res.data.status === 1) {
          dispatch({
            type: Actions.LOGOUT_SUCCESS,
            payload: {
              status: res.data.status,
              message: res.data.message,
            },
          });
        } else if (res.data.status === 0) {
          dispatch({
            type: Actions.LOGOUT_FAIL,
            payload: {
              status: res.data.status,
              message: res.data.message,
            },
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`);
          localStorage.removeItem(
            `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`
          );
          localStorage.removeItem(
            `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
          );
          // window.location.href = "/login";
          dispatch({
            type: Actions.LOGOUT_FAIL,
          });
        }
      });
  };
}
