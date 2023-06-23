import axios from "axios";
import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";

/**
 * 1 cách optimize cách viết này đó chính là tạo 1 hook là useAuth() nma lười quá nên tạm v
 */

export function getProfile(callback) {
  const axiosConfig = AxiosConfig();

  axiosConfig
    .get(`${process.env.REACT_APP_API}user`)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => {
            getProfile(callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function updateProfile(data, callback) {
  const axiosConfig = AxiosConfig();
  axiosConfig
    .put(`${process.env.REACT_APP_API}user/change/profile`, data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => {
            updateProfile(data, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function getListUsers(pagination, filter, sorter, callback) {
  const axios = AxiosConfig();
  let api = "";
  if (Object.keys(filter).length === 0) {
    api = `/user?page=${pagination.current}&size=${pagination.pageSize}`;
  } else {
    api = `/user?page=${pagination.current}&size=${pagination.pageSize}&${filter.filterStr}`;
  }
  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(getListUsers(pagination, filter, sorter, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function getUserDetails(user_id, callback) {
  const axios = AxiosConfig();
  axios
    .get(`/user/detail/${user_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(getUserDetails(user_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function loginUser(data, callback) {
  const axios = AxiosConfig();
  console.log(data);
  axios
    .post(`${process.env.REACT_APP_API}auth/login`, data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data);
      }
    });
}

export function forgotPassword(data, callback) {
  const axios = AxiosConfig();
  axios
    .post(`${process.env.REACT_APP_API}user/forgot-password`, data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data);
      }
    });
}

export const verifyToken = (token, callback) => {
  const axios = AxiosConfig();
  axios
    .get(`${process.env.REACT_APP_API}user/forgot-password/verify/${token}`)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data);
      }
    });
};

export const updatePassword = (data, callback) => {
  const axiosConfig = AxiosConfig();
  axiosConfig
    .patch(`${process.env.REACT_APP_API}user/change/password`, data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => {
            updatePassword(data, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
};

export const updateVerifyPassword = (data, callback) => {
  const axiosConfig = AxiosConfig();
  axiosConfig
    .post(
      `${process.env.REACT_APP_API}user/forgot-password/updatePassword`,
      data
    )
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => {
            updateVerifyPassword(data, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
};
