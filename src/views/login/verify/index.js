import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
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
import "../Login.scss";
import { withNamespaces } from "react-i18next";
import { verifyToken, updateVerifyPassword } from "src/services/user";

var _ = require("lodash");

const Verify = ({ t }) => {
  const [loading, setLoading] = useState(false);
  const pathname = useLocation().pathname.split("/");
  const verifyId = pathname[4];
  const history = useHistory();
  useEffect(() => {
    if (verifyId) {
      verifyToken(verifyId, (res) => {
        if (res.status == 200) {
          message.success(t(`${res.data.message}`));
        }
        if (res.status !== 200) {
          notification.error({
            message: t(`Notification`),
            description: t(`${res.message || "Verify failed"}`),
            placement: `bottomRight`,
            duration: 1.5,
          });
          history.push("/login");
        }
      });
    }
  }, [verifyId]);
  const onFinish = (values) => {
    const { remember, ...data } = values;
    setLoading(true);
    data.active_token = verifyId;
    updateVerifyPassword(data, (res) => {
      if (res.status == 200) {
        notification.success({
          message: t(`Notification`),
          description: t(
            `${res.data.message} || 'Update password success succesfully'`
          ),
          placement: `bottomRight`,
          duration: 1.5,
        });
        setLoading(false);
        history.push("/login");
      }
      if (res.status !== 200) {
        notification.error({
          message: t(`Notification`),
          description: t(`${res.message || "Update password success failed!"}`),
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
            <label htmlFor="password">{t("Password")}</label>
            <Form.Item
              name="new_password"
              rules={[
                {
                  required: true,
                  message: t("Please input your password!"),
                },
              ]}
            >
              <Input type="password" placeholder={t("Password")} />
            </Form.Item>
            <label htmlFor="password">{t("Confirm Password")}</label>
            <Form.Item
              name="confirm_new_password"
              rules={[
                {
                  required: true,
                  message: t("Please input your confirm password!"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("Password does not match!"))
                    );
                  },
                }),
              ]}
            >
              <Input type="password" placeholder={t("Password")} />
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
            >
              {t("Login")}
            </Button>
          </Form>
        </Col>
      </Row>
      <div className={"footer"}>Uray Store</div>
    </div>
  );
};

export default withNamespaces()(Verify);
