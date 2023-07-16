import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
  CCardImg,
} from "@coreui/react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  message,
  Radio,
  notification,
} from "antd";
import car_image from "src/assets/car_image.svg";
import "./Login.scss";
import { Roles, Validate } from "src/configs";
import { useDispatch, useSelector } from "react-redux";
import { login } from "src/actions/user";
import { storeUserData } from "src/services/auth";
import i18n from "src/services/i18n";
import { withNamespaces } from "react-i18next";
import { loginUser } from "src/services/user";

var _ = require("lodash");

const Login = ({ t }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    const { remember, ...data } = values;
    loginUser(data, (res) => {
      if (res.status == 200) {
        dispatch(login(res.data));
      }
      if (res.status !== 200) {
        console.log(res);
        notification.error({
          message: t(`Notification`),
          description: t(`${res.message || "Login failed"}`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    });
  };
  // console.log(user)
  useEffect(() => {
    setLoading(false);
    if (
      Object.keys(user.data).length !== 0 &&
      Object.keys(user.data).length !== 0
    ) {
      if (user.status && user.status !== 200) {
        notification.error({
          message: t(`Notification`),
          description: `${user.message}`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      } else {
        if (!_.isEmpty(user.data)) {
          i18n.changeLanguage("vi");
          storeUserData(user.data); // store user data to localStorage
          history.push("/products");
        } else {
          message.error("User data is empty.");
        }
      }
    } else {
      notification.info({
        message: t(`Notification`),
        description: t(`Welcome to our admin of Simplicity team`),
        placement: `bottomRight`,
        duration: 2.5,
      });
    }
  }, [user]);

  return (
    <div className={"login"} style={{ height: "100%", minHeight: "100%" }}>
      <Row span={24} className={"login-container"}>
        <Col lg={12} className={"left-side"}>
          <h2>{t("Login")}</h2>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            className="position-relative"
          >
            <label htmlFor="email">{t("Email")}</label>
            <Form.Item
              name="email"
              rules={[
                {
                  validator: (_, value) => {
                    if (value) {
                      // let regex_phone = new RegExp(Validate.REGEX_EMAIL);
                      // if (regex_phone.test(value)) {
                      return Promise.resolve();
                      //   } else {
                      //     return Promise.reject(
                      //       new Error(t("Please enter a valid email!"))
                      //     );
                      //   }
                      // } else {
                      //   return Promise.reject(
                      //     new Error(t("Please input an email!"))
                      //   );
                    }
                  },
                },
              ]}
            >
              <Input placeholder={t("Email")} />
            </Form.Item>
            <label htmlFor="password">{t("Password")}</label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("Please input your Password!"),
                },
              ]}
            >
              <Input type="password" placeholder={t("Password")} />
            </Form.Item>
            <Button htmlType="submit" className="box-1" loading={loading}>
              {t("Login")}
            </Button>
            <Button
              htmlType="button"
              className="box-2"
              loading={loading}
              onClick={() => history.push("/forgot-password")}
            >
              {t("Forgot password")}
            </Button>
          </Form>
        </Col>
      </Row>
      <div className={"footer"}>Uray Store</div>
    </div>
  );
};

export default withNamespaces()(Login);
