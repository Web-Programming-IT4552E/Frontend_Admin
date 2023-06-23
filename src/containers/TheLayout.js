import React, { useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { getAllowedNav, getAllowedRoute } from "src/services/auth";
import { Redirect } from "react-router-dom";
import routes from "../routes";
import navigation from "./_nav";
import { useSelector } from "react-redux";
// import socket from "src/socket";
import { useLocation, useHistory } from "react-router";
import { Roles } from "src/configs";
require("dotenv").config();
const _ = require("lodash");

const TheLayout = (props) => {
  const user = useSelector((state) => state.user);
  let allowedRoutes = [];
  let allowedNav = [];
  let location = useLocation();
  let pathname = location.pathname;
  let history = useHistory();
  if (user && !_.isEmpty(user.data)) {
    allowedRoutes = getAllowedRoute(routes, user.data.role.toUpperCase()); // At this time we only have ADMIN ROLE
    allowedNav = getAllowedNav(navigation, user.data.role.toUpperCase());
  } else {
    if (Object.keys(user.data).length == 0) {
      window.location.href = "/login";
      return <Redirect to={pathname} />;
    } else {
      return <Redirect from="/" to="login" />;
    }
  }
  return (
    <div className="c-app c-default-layout" id="layout">
      <TheSidebar navigation={allowedNav} />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent routes={allowedRoutes} />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
