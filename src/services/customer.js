import { AxiosConfig } from "src/configs";
import { getToken } from "./auth";

export function getListCustomers(pagination, filters, callback) {
  const axios = AxiosConfig();
  let api = `/customer?page=${pagination.page || 1}&limit=${
    pagination.limit || 100
  }`;
  if (filters && filters?.rank) {
    api += `&rank=`;
    filters.rank.forEach((item) => {
      api += `${item},`;
    });
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
            getListCustomers(pagination, filters, callback);
          });
        } else {
          callback({
            ...err.response,
            message: "Get list customers failed!",
          });
        }
      }
    });
}

export function getCustomerDetail(customer_id, callback) {
  const axios = AxiosConfig();
  let api = `/customer/${customer_id}`;
  axios
    .get(api)
    .then((res) => {
      callback({ ...res });
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status == 401 || err.response.status == 403) {
          getToken(() => {
            getCustomerDetail(customer_id, callback);
          });
        } else {
          callback({
            ...err.response,
            message: "Get customer detail failed!",
          });
        }
      }
    });
}

export function updateCustomer(customer_id, isBlock, callback) {
  const axios = AxiosConfig();
  let api = ``;
  if (isBlock) {
    api = `/customer/unblock/${customer_id}`;
  } else {
    api = `/customer/block/${customer_id}`;
  }
  axios
    .patch(api)
    .then((res) => {
      callback({ ...res });
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status == 401 || err.response.status == 403) {
          getToken(() => {
            updateCustomer(customer_id, isBlock, callback);
          });
        } else {
          callback({
            ...err.response,
            message: "Get customer detail failed!",
          });
        }
      }
    });
}
