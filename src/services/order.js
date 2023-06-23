import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";
/**
 * 1 cách optimize cách viết này đó chính là tạo 1 hook là useResourceData() nma lười quá nên tạm v
 */
export function getListOrders(pagination, status, rangeTime, callback) {
  const axios = AxiosConfig();
  let api = "";
  if (pagination.category) {
    api = `/order?page=${pagination.page || 1}&limit=${
      pagination.limit || 100
    }&category=${pagination.category}&status=${status}`;
  } else {
    api = `/order?page=${pagination.page || 1}&limit=${
      pagination.limit || 100
    }&status=${status}`;
  }
  if (rangeTime) {
    api = `${api}&start-end-time=${rangeTime}`;
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
            getListOrders(pagination, callback);
          });
        } else {
          callback({
            ...err.response,
            message: "Get list orders failed!",
          });
        }
      }
    });
}

export function getOrderDetail(order_id, callback) {
  const axios = AxiosConfig();

  axios
    .get(`${process.env.REACT_APP_API}orders/${order_id}`)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          getToken(() => {
            getOrderDetail(order_id, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function confirmOrderDetail(order_id, data, callback) {
  const axios = AxiosConfig();

  axios
    .patch(`${process.env.REACT_APP_API}orders/confirm/${order_id}`, data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          getToken(() => {
            confirmOrderDetail(order_id, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function confirmSuccessOrderDetail(order_id, callback) {
  const axios = AxiosConfig();
  axios
    .patch(`${process.env.REACT_APP_API}orders/success/${order_id}`)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          getToken(() => {
            confirmSuccessOrderDetail(order_id, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function cancelOrderDetail(order_id, callback) {
  const axios = AxiosConfig();

  axios
    .delete(`${process.env.REACT_APP_API}orders/${order_id}`)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          getToken(() => {
            cancelOrderDetail(order_id, callback);
          });
        } else {
          callback(err.response.data);
        }
      }
    });
}
