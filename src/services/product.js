import axios from "axios";
import { AxiosConfig } from "src/configs";
import { getToken, getLazyToken } from "./auth";
/**
 * 1 cách optimize cách viết này đó chính là tạo 1 hook là useResourceData() nma lười quá nên tạm v
 */
export async function getLazyProducts(pagination, category_id) {
  const axios = AxiosConfig();
  let api = "";
  if (category_id) {
    api = `/product?page=${pagination.page || 1}&limit=${
      pagination.limit || 100
    }&category=${category_id}`;
  } else {
    api = `/product?page=${pagination.page || 1}&limit=${
      pagination.limit || 100
    }`;
  }
  return await axios.get(api);
}
export function getListProducts(pagination, category_id, callback) {
  const axios = AxiosConfig();
  let api = "";
  if (category_id) {
    api = `/product?page=${pagination.page || 1}&limit=${
      pagination.limit || 100
    }&category=${category_id}`;
  } else {
    api = `/product?page=${pagination.page || 1}&limit=${
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
            getListProducts(pagination, category_id, callback);
          });
        } else {
          callback({
            ...err.response,
            message: "Get list products failed!",
          });
        }
      }
    });
}

export function getProductDetail(product_id, callback) {
  const axios = AxiosConfig();

  axios
    .get(`${process.env.REACT_APP_API}product/${product_id}`)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
        if (err.response.status === 401 || err.response.status === 403) {
          getToken(() => {
            getProductDetail(product_id, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function updateProduct(product_id, data, callback) {
  const axios = AxiosConfig();
  axios
    .put(`/product/detail/${product_id}`, data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403 || err.response.status == 401) {
          getToken(() => {
            updateProduct(product_id, data, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function createProduct(data, callback) {
  const axios = AxiosConfig();
  axios
    .post(`/product`, data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403 || err.response.status == 401) {
          getToken(() => {
            createProduct(data, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function convertToGift(product_id, data, callback) {
  const axios = AxiosConfig();
  axios
    .put(`/product/convert/${product_id}`, data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403 || err.response.status == 401) {
          getToken(() => {
            convertToGift(product_id, data, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}
