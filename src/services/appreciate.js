import axios from "axios";
import { AxiosConfig } from "src/configs";
import { getToken, getLazyToken } from "./auth";
/**
 * 1 cách optimize cách viết này đó chính là tạo 1 hook là useResourceData() nma lười quá nên tạm v
 */
export async function getLazyAppreciates(pagination, category_id) {
  const axios = AxiosConfig();
  let api = "";
  if (category_id) {
    api = `/appreciationProduct?page=${pagination.page || 1}&limit=${
      pagination.limit || 100
    }&category=${category_id}`;
  } else {
    api = `/appreciationProduct?page=${pagination.page || 1}&limit=${
      pagination.limit || 100
    }`;
  }
  return await axios.get(api);
}
export function getListAppreciates(pagination, category_id, callback) {
  const axios = AxiosConfig();
  let api = "";
  if (category_id) {
    api = `/appreciationProduct?page=${pagination.page || 1}&limit=${
      pagination.limit || 100
    }&category=${category_id}`;
  } else {
    api = `/appreciationProduct?page=${pagination.page || 1}&limit=${
      pagination.limit || 100
    }`;
  }
  axios
    .get(api)
    .then((res) => {
      callback({ ...res });
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status == 401 || err.response.status == 403) {
          getToken(() => {
            getListAppreciates(pagination, category_id, callback);
          });
        } else {
          callback({
            ...err.response,
            message: "Get list appreciation products failed!",
          });
        }
      }
    });
}

export function getAppreciateDetail(product_id, callback) {
  const axios = AxiosConfig();

  axios
    .get(`${process.env.REACT_APP_API}appreciationProduct/${product_id}`)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
        if (err.response.status === 401 || err.response.status === 403) {
          getToken(() => {
            getAppreciateDetail(product_id, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function updateAppreciate(product_id, data, callback) {
  const axios = AxiosConfig();
  axios
    .put(`/appreciationProduct/${product_id}`, data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403 || err.response.status == 401) {
          getToken(() => {
            updateAppreciate(product_id, data, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function createAppreciate(data, callback) {
  const axios = AxiosConfig();
  axios
    .post(`/appreciationProduct`, data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403 || err.response.status == 401) {
          getToken(() => {
            createAppreciate(data, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}
