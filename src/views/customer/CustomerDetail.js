import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Status } from "src/configs";
import {
  Table,
  Space,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  Upload,
  Avatar,
} from "antd";
import { useSelector } from "react-redux";
import { uploadImage } from "src/services/image";
import { getProductDetail, updateProduct } from "src/services/product";
import { getCustomerDetail, updateCustomer } from "src/services/customer";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { storage } from "src/firebase";
import { withNamespaces } from "react-i18next";
import { useHistory } from "react-router";
import BaseHelper from "src/services/helper";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const CustomerDetail = ({ match, t }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [data, setData] = useState();
  const [statusName, setStatusName] = useState("Active");
  const [statusColor, setStatusColor] = useState("green");

  console.log(data);

  useEffect(() => {
    getCustomerDetail(match.params.id, (res) => {
      if (res.status === 200) {
        setData(res.data);
        setStatusName(
          Status.users.filter((item) => item.id == res.data.status)[0].name
        );
        setStatusColor(
          Status.users.filter((item) => item.id == res.data.status)[0].color
        );
      } else {
        notification.error({
          message: t(`Notification`),
          description: `Get Driver failed.`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    });
  }, []);
  const onFinish = (values) => {
    const customer_id = match.params.id;
    Modal.confirm({
      title: t(`Update Customer`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to update this customer? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        updateCustomer(customer_id, data?.status == 1 ? false : true, (res) => {
          if (res.status === 200) {
            notification.success({
              message: t(`Notification`),
              description: `Update customer successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            history.push("/customers");
          } else {
            notification.error({
              message: t(`Notification`),
              description: `Update customer failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop update customer`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };
  return (
    <CRow>
      <CCol xs="12" md="9" className="mb-4">
        <CCard>
          <CCardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            {t("Customer Detail")}
          </CCardHeader>
          <CCardBody>
            <Form form={form} {...formItemLayout} onFinish={onFinish}>
              <Form.Item label={t("Name")} labelAlign="left" name="fullname">
                <p>{`${data?.fullname}`}</p>
              </Form.Item>
              <Form.Item label={t("Email")} labelAlign="left" name="email">
                <p>{`${data?.email}`}</p>
              </Form.Item>
              <Form.Item label={t("Phone")} labelAlign="left" name="phone">
                <p>{`${data?.phone}`}</p>
              </Form.Item>
              <Form.Item label={t("Rank")} labelAlign="left" name="rank">
                <Tag
                  color={
                    Status.rank.filter((item) => item.id == data?.rank)[0]
                      ?.color
                  }
                >
                  {Status.rank.filter((item) => item.id == data?.rank)[0]?.name}
                </Tag>
              </Form.Item>
              <Form.Item label={t("Status")} labelAlign="left" name="status">
                <Tag
                  color={
                    Status.users.filter((item) => item.id == data?.status)[0]
                      ?.color
                  }
                >
                  {
                    Status.users.filter((item) => item.id == data?.status)[0]
                      ?.name
                  }
                </Tag>
              </Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                className={`${
                  data?.status == 1 || data?.status == 0
                    ? "btn-danger"
                    : "btn-success"
                }`}
              >
                {t(
                  `${
                    data?.status == 1 || data?.status == 0 ? "Block" : "Unblock"
                  }`
                )}
              </Button>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(CustomerDetail);
