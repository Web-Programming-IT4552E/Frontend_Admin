import { AxiosConfig } from "src/configs";
import { failTokens } from "./failTokens";
import sockets from "src/socket";
const axios = AxiosConfig();

export function isLoggedIn() {
  return !!localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`);
}

export function getAllowedRoute(routes, role) {
  var allowedData = [];
  routes.forEach((route) => {
    if (route.permission) {
      if (route.permission.includes(role)) {
        allowedData.push(route);
      }
    } else {
      allowedData.push(route);
    }
  });

  return allowedData;
}

export function getAllowedNav(navigation, role) {
  var allowedData = [];
  navigation.forEach((nav) => {
    if (nav.permission) {
      if (nav.permission.includes(role)) {
        if (nav._children) {
          nav._children.forEach((child, index) => {
            if (child.permission && !child.permission.includes(role)) {
              nav._children.splice(index, 1);
            }
          });
        }

        allowedData.push(nav);
      }
    } else {
      if (nav._children) {
        nav._children.forEach((child, index) => {
          if (child.permission && !child.permission.includes(role)) {
            nav._children.splice(index, 1);
          }
        });
      }

      allowedData.push(nav);
    }
  });

  return allowedData;
}

export function storeUserData(data) {
  const user = {
    email: data.email,
    role: data.role,
  };
  localStorage.setItem(
    `${process.env.REACT_APP_PREFIX_LOCAL}_user`,
    JSON.stringify(user)
  );
}

export function getToken(callback) {
  axios
    .post(`${process.env.REACT_APP_API}auth/refresh-token`, {
      accessToken: localStorage.getItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`
      ),
      refreshToken: localStorage.getItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
      ),
    })
    .then((res) => {
      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
        res.data.data.access_token
      );
      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`,
        res.data.data.refresh_token
      );
      callback();
    })
    .catch((err) => {
      if (err.response) {
        if (failTokens().includes(err.response.status)) {
          logOut();
        }
      }
    });
}

export async function getLazyToken() {
  await axios
    .post(`${process.env.REACT_APP_API}auth/refresh`, {
      accessToken: localStorage.getItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`
      ),
      refreshToken: localStorage.getItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
      ),
    })
    .then((res) => {
      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
        res.data.data.access_token
      );
      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`,
        res.data.data.refresh_token
      );
      // callback();
    })
    .catch((err) => {
      if (err.response) {
        if (failTokens().includes(err.response.status)) {
          logOut();
        }
      }
    });
}

export function logOut() {
  localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`);
  localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`);
  localStorage.removeItem(
    `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
  );
  window.location.href = "/login";
}
