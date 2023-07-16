import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import "../Login.scss";
import { Roles, Validate } from "src/configs";
import { withNamespaces } from "react-i18next";
import { forgotPassword } from "src/services/user";

var _ = require("lodash");

const ForgotPassword = ({ t }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = (values) => {
    const { remember, ...data } = values;
    setLoading(true);
    forgotPassword(data, (res) => {
      if (res.status == 200) {
        console.log(res);
        notification.success({
          message: t(`Notification`),
          description: t(
            `${
              res?.data?.message ||
              "Send reset password confirmation email success succesfully"
            }`
          ),
          placement: `bottomRight`,
          duration: 1.5,
        });
        setLoading(false);
      }
      if (res.status !== 200) {
        console.log(res);
        notification.error({
          message: t(`Notification`),
          description: t(
            `${res.message || "Send email for recover password failed"}`
          ),
          placement: `bottomRight`,
          duration: 1.5,
        });
        setLoading(false);
      }
    });
  };

  return (
    <div className={"login"} style={{ height: "100%", minHeight: "100%" }}>
      <Row span={24} className={"login-container"}>
        <Col lg={12} className={"left-side forgot-password"}>
          <h2>{t("Forgot Password")}</h2>
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
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input placeholder={t("Email")} />
            </Form.Item>
            <Button htmlType="submit" className="box-1" loading={loading}>
              {t("Confirm")}
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                history.push("/login");
              }}
              className="box-2"
              loading={loading}
            >
              {t("Login")}
            </Button>
          </Form>
        </Col>
      </Row>
      <div className={"footer"}>Uray</div>
    </div>
  );
};

export default withNamespaces()(ForgotPassword);
