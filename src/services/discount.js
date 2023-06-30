import { AxiosConfig } from "src/configs";
import { getToken, getLazyToken } from "./auth";
/**
 * 1 cách optimize cách viết này đó chính là tạo 1 hook là useResourceData() nma lười quá nên tạm v
 */

export function getListDiscounts(pagination, callback) {
  const axios = AxiosConfig();
  let api = "";
  api = `/discount-code?page=${pagination.page || 1}&limit=${
    pagination.limit || 100
  }`;
  axios
    .get(api)
    .then((res) => {
      callback({ ...res });
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status == 401 || err.response.status == 403) {
          getToken(() => {
            getListDiscounts(pagination, callback);
          });
        } else {
          callback({
            ...err.response,
            message: "Get list discount codes failed!",
          });
        }
      }
    });
}

export function createDiscount(data, callback) {
  const axios = AxiosConfig();
  axios
    .post(`/discount-code`, data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403 || err.response.status == 401) {
          getToken(() => {
            createDiscount(data, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function getDiscountDetail(discount_id, callback) {
  const axios = AxiosConfig();
  let api = "";
  api = `/discount-code/${discount_id}`;
  axios
    .get(api)
    .then((res) => {
      callback({ ...res });
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status == 401 || err.response.status == 403) {
          getToken(() => {
            getDiscountDetail(discount_id, callback);
          });
        } else {
          callback({
            ...err.response,
            message: "Get discount code detail failed!",
          });
        }
      }
    });
}

export function disableDiscountCode(discount_id, callback) {
  const axios = AxiosConfig();
  let api = "";
  api = `/discount-code/${discount_id}`;
  axios
    .patch(api)
    .then((res) => {
      callback({ ...res });
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status == 401 || err.response.status == 403) {
          getToken(() => {
            disableDiscountCode(discount_id, callback);
          });
        } else {
          callback({
            ...err.response,
            message: "Disable discount code detail failed!",
          });
        }
      }
    });
}
