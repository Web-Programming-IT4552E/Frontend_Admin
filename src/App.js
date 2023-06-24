import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryThunk } from "./actions/category";
import "src/scss/style.scss";
// Import Main styles for this application
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const Login = React.lazy(() => import("./views/login/Login"));
const Page404 = React.lazy(() => import("./views/page404/Page404"));
const Page500 = React.lazy(() => import("./views/page500/Page500"));
const ForgotPassword = React.lazy(() =>
  import("./views/login/forgot-password")
);
const Verify = React.lazy(() => import("./views/login/verify/index"));

const App = () => {
  const user = useSelector((state) => state.user).data;
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(getCategoryThunk());
  }, [user]);
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/forgot-password"
            name="Forgot Password Page"
            render={(props) => <ForgotPassword {...props} />}
          />

          <Route
            exact
            path="/account/forgot-password/verify/:id"
            name="Verify Recover Password Page"
            render={(props) => <Verify {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <Route
            path="/"
            name="Home"
            render={(props) => <TheLayout {...props} />}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
