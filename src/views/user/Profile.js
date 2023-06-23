import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardFooter, CCol, CRow } from "@coreui/react";
import {
  // Button,
  Descriptions,
  Input,
  Form,
  notification,
  Button,
  DatePicker,
  Modal,
  Space,
} from "antd";
import { updateProfile } from "src/services/user";
import moment from "moment";
import { withNamespaces } from "react-i18next";
import { getProfile } from "src/services/user";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const Profile = ({ t }) => {
  const [userData, setUserData] = useState();
  const [form] = Form.useForm();
  const history = useHistory();

  const updateProfileHandler = (values) => {
    Modal.confirm({
      title: t(`Update Profile`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to update profile? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        updateProfile(values, (res) => {
          if (res.status === 200) {
            notification.success({
              message: t(`Notification`),
              description: `Update profile successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            history.push("/");
          } else {
            notification.error({
              message: t(`Notification`),
              description: `Update profile failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop update profile`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };

  useEffect(() => {
    getProfile((res) => {
      if (res.status === 200) {
        setUserData(res.data);
        res.data.birthday = moment(
          new Date(res.data.birthday),
          "HH:mm DD/MM/YYYY"
        );
        form.setFieldsValue(res.data);
        notification.success({
          message: t(`Notification`),
          description: `${res.data?.message || "Get profile successfully!"}`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      } else {
        notification.error({
          message: t(`Notification`),
          description: `${res?.message || "Get profile failed!"}`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    });
  }, []);
  return (
    <>
      <CRow className="justify-content-center">
        <CCol xs="12" sm="10">
          <CCard>
            <Form form={form} onFinish={updateProfileHandler}>
              <CCardBody>
                {userData ? (
                  <Descriptions title={t("User's Info")} bordered>
                    <Descriptions.Item label={t("Name")} span={3}>
                      <Form.Item
                        name="fullname"
                        rules={[
                          {
                            required: true,
                            message: t("Please input full name!"),
                          },
                        ]}
                        className="h-100"
                      >
                        <Input
                          type="text"
                          placeholder={t("Please input full name!")}
                        />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("Email")} span={3}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: t("Please input email!"),
                          },
                        ]}
                        className="h-100"
                      >
                        <Input
                          type="text"
                          placeholder={t("Please input email!")}
                        />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("Phone Number")} span={3}>
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: t("Please input phone number!"),
                          },
                        ]}
                        className="h-100"
                      >
                        <Input
                          type="text"
                          placeholder={t("Please input phone number!")}
                        />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("Address")} span={3}>
                      <Form.Item
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: t("Please input address!"),
                          },
                        ]}
                        className="h-100"
                      >
                        <Input
                          type="text"
                          placeholder={t("Please input address!")}
                        />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("Birthday")} span={3}>
                      <Form.Item
                        name="birthday"
                        rules={[
                          {
                            required: true,
                            message: t("Please input birthday!"),
                          },
                        ]}
                        className="h-100"
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder="Please input birthday!"
                          format="HH:mm DD/MM/YYYY"
                          showTime={{
                            defaultValue: moment("00:00:00", "HH:mm:ss"),
                          }}
                        />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("Role")} span={3}>
                      {userData?.type ? userData.type.toUpperCase() : "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                ) : null}
              </CCardBody>
              <CCardFooter className="d-flex justify-content-end">
                <Space direction="horizontal" className="flex-wrap">
                  <Button type="primary" htmlType="submit">
                    {t(`Update Profile`)}
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

export default withNamespaces()(Profile);
