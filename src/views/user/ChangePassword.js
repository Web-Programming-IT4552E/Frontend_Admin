import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardFooter, CCol, CRow } from "@coreui/react";
import {
  // Button,
  Descriptions,
  Input,
  Form,
  notification,
  Button,
  Modal,
  Space,
} from "antd";
import { withNamespaces } from "react-i18next";
import { updatePassword } from "src/services/user";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const ChangePassword = ({ t }) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const updatePasswordHandler = (values) => {
    Modal.confirm({
      title: t(`Update Password`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to update password? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        updatePassword(values, (res) => {
          if (res.status === 200) {
            notification.success({
              message: t(`Notification`),
              description: `Update password successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            history.push("/");
          } else {
            notification.error({
              message: t(`Notification`),
              description: `Wrong old password.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop update password`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };

  return (
    <>
      <CRow className="justify-content-center">
        <CCol xs="12" sm="10">
          <CCard>
            <Form form={form} onFinish={updatePasswordHandler}>
              <CCardBody>
                <Descriptions title={t("Change Password")} bordered>
                  <Descriptions.Item label={t("Old Password")} span={3}>
                    <Form.Item
                      name="old_password"
                      rules={[
                        {
                          required: true,
                          message: t("Please input old password!"),
                        },
                      ]}
                      className="h-100"
                    >
                      <Input.Password
                        type="password"
                        placeholder={t("Please input old password!")}
                      />
                    </Form.Item>
                  </Descriptions.Item>
                  <Descriptions.Item label={t("New Password")} span={3}>
                    <Form.Item
                      name="new_password"
                      rules={[
                        {
                          required: true,
                          message: t("Please input new password!"),
                        },
                      ]}
                      className="h-100"
                    >
                      <Input.Password
                        type="password"
                        placeholder={t("Please input new password!")}
                      />
                    </Form.Item>
                  </Descriptions.Item>
                </Descriptions>
              </CCardBody>
              <CCardFooter className="d-flex justify-content-end">
                <Space direction="horizontal" className="flex-wrap">
                  <Button type="primary" htmlType="submit">
                    {t(`Change Password`)}
                  </Button>
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    {t(`Back to Home`)}
                  </Button>
                </Space>
              </CCardFooter>
            </Form>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default withNamespaces()(ChangePassword);
