import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Status } from "src/configs";
import { SuccessStatus } from "src/configs/Status";
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
  Row,
  Col,
} from "antd";
import { useSelector } from "react-redux";
import { uploadImage } from "src/services/image";
import RenderIf from "src/containers/RenderIf";
import { getProductDetail, updateProduct } from "src/services/product";
import { getOrderDetail } from "src/services/order";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { storage } from "src/firebase";
import { withNamespaces } from "react-i18next";
import {
  cancelOrderDetail,
  confirmOrderDetail,
  confirmSuccessOrderDetail,
} from "src/services/order";
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

const OrderDetail = ({ match, t }) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const categories = useSelector((state) => state.categories);
  const [form] = Form.useForm();
  const history = useHistory();
  const [data, setData] = useState();
  const [avatarURL, setAvatarURL] = useState();
  const [statusName, setStatusName] = useState("Active");
  const [statusColor, setStatusColor] = useState("green");
  const columns = [
    {
      title: t("Name"),
      dataIndex: "name",
      render: (name) => <>{name}</>,
    },
    {
      title: t("Quantity"),
      dataIndex: "quantity",
      render: (quantity) => <>{quantity}</>,
    },
    {
      title: t("Price"),
      dataIndex: "price",
      render: (price) => <>{BaseHelper.formatVND(price)}</>,
    },
    {
      title: t("Image"),
      dataIndex: "image",
      render: (avatar) => (
        <Avatar
          src={avatar}
          alt="product-img"
          shape="square"
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 64, xxl: 64 }}
        />
      ),
    },
  ];
  const columnsGift = [
    {
      title: t("Name"),
      dataIndex: "name",
      render: (name) => <>{name}</>,
    },
    {
      title: t("Quantity"),
      dataIndex: "quantity",
      render: (quantity) => <>{quantity}</>,
    },
    {
      title: t("Point"),
      dataIndex: "point",
      render: (point) => <>{point}</>,
    },
    {
      title: t("Image"),
      dataIndex: "image",
      render: (avatar) => (
        <Avatar
          src={avatar}
          alt="product-img"
          shape="square"
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 64, xxl: 64 }}
        />
      ),
    },
  ];
  useEffect(() => {
    getOrderDetail(match.params.id, (res) => {
      console.log(res);
      if (res.status == 200) {
        let submitData = {};
        submitData.shipping_unit = res.data[0].shipping_unit;
        submitData.shipping_code = res.data[0].shipping_code;
        submitData.shipping_cost = res.data[0].shipping_cost
          ? res.data[0].shipping_cost
          : "0";
        console.log(submitData);
        form.setFieldsValue({ ...submitData });
        setStatusName(
          Status.products.filter((item) => item.id == res.data[0].status)[0]
            .name
        );
        setStatusColor(
          Status.products.filter((item) => item.id == res.data[0].status)[0]
            .color
        );
        setData(res.data[0]);
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
  const confirmDeliveryHandler = (values) => {
    const order_id = match.params.id;
    Modal.confirm({
      title: t(`Confirm Delivery`),
      icon: <ExclamationCircleOutlined />,
      content: t(`You are going to confirm the delivery of this order?`),
      onOk() {
        let submitData = {};
        submitData.shipping_unit = values.shipping_unit;
        submitData.shipping_code = values.shipping_code;
        submitData.shipping_cost = values.shipping_cost
          ? parseInt(values?.shipping_cost)
          : 0;
        confirmOrderDetail(order_id, submitData, (res) => {
          if (SuccessStatus.indexOf(res.status) != -1) {
            notification.success({
              message: t(`Notification`),
              description: t(`Confirm delivery order successfully`),
              placement: `bottomRight`,
              duration: 1.5,
            });
            history.push("/orders");
          } else {
            notification.error({
              message: t(`Notification`),
              description: t(`${res.message}`),
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop confirm delivery order`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };
  const cancelHandler = () => {
    const order_id = match.params.id;
    Modal.confirm({
      title: t(`Cancel Order`),
      icon: <ExclamationCircleOutlined />,
      content: t(`You are going to cancel this order?`),
      onOk() {
        cancelOrderDetail(order_id, (res) => {
          if (SuccessStatus.indexOf(res.status) != -1) {
            notification.success({
              message: t(`Notification`),
              description: t(`Cancel order successfully`),
              placement: `bottomRight`,
              duration: 1.5,
            });
            history.push("/orders");
          } else {
            notification.error({
              message: t(`Notification`),
              description: t(`${res.message}`),
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop confirm delivery order`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };
  const confirmSuccessHandler = () => {
    const order_id = match.params.id;
    Modal.confirm({
      title: t(`Confirm Order`),
      icon: <ExclamationCircleOutlined />,
      content: t(`You are going to confirm delivery success this order?`),
      onOk() {
        confirmSuccessOrderDetail(order_id, (res) => {
          if (SuccessStatus.indexOf(res.status) != -1) {
            notification.success({
              message: t(`Notification`),
              description: t(`Confirm delivery success order successfully`),
              placement: `bottomRight`,
              duration: 1.5,
            });
            history.push("/orders");
          } else {
            notification.error({
              message: t(`Notification`),
              description: t(`${res.message}`),
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop confirm delivery order`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };
  return (
    <CRow>
      <CCol xs="12" md="12" lg={7} className="mb-4">
        <CCard>
          <CCardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            {`${t("Product Detail")} ( ${t("Order Code")}: ${
              data?.order_id || 0
            })`}
          </CCardHeader>
          <CCardBody>
            <Form
              form={form}
              {...formItemLayout}
              onFinish={confirmDeliveryHandler}
            >
              <Form.Item label={t("Email")} labelAlign="left" name="email">
                <p>{data?.customer_email}</p>
              </Form.Item>
              <Form.Item
                label={t("Receiver Name")}
                labelAlign="left"
                name="name"
              >
                <p>{data?.shipping_address?.receiver_name}</p>
              </Form.Item>
              <Form.Item label={t("Phone")} labelAlign="left" name="phone">
                <p>{data?.shipping_address?.receiver_phone_number}</p>
              </Form.Item>
              <Form.Item label={t("Address")} labelAlign="left" name="address">
                <p>{data?.shipping_address?.address}</p>
              </Form.Item>
              <Form.Item label={t("Ward")} labelAlign="left" name="ward">
                <p>{data?.shipping_address?.ward}</p>
              </Form.Item>
              <Form.Item
                label={t("District")}
                labelAlign="left"
                name="district"
              >
                <p>{data?.shipping_address?.district}</p>
              </Form.Item>
              <Form.Item label={t("City")} labelAlign="left" name="city">
                <p>{data?.shipping_address?.city}</p>
              </Form.Item>
              <Form.Item
                label={t("Payment Method")}
                labelAlign="left"
                name="payment_method"
              >
                <p>{data?.payment_method}</p>
              </Form.Item>
              <Form.Item
                label={t("Discount")}
                labelAlign="left"
                name="discount"
              >
                <p>{data?.discount ? t("Yes") : t("No")}</p>
              </Form.Item>
              <Form.Item
                label={t("Discount")}
                labelAlign="left"
                name="discount"
              >
                <p>{data?.discount ? t("Yes") : t("No")}</p>
              </Form.Item>
              <Form.Item
                label={t("Shipping Code")}
                labelAlign="left"
                name="shipping_code"
                rules={[
                  {
                    required: true,
                    message: t("Please input shipping code!"),
                  },
                ]}
              >
                {data?.status != 2 && data?.status != 3 && data?.status != 1 ? (
                  <Input placeholder={t("Please input shipping code")} />
                ) : (
                  <p>{data?.shipping_code}</p>
                )}
              </Form.Item>
              <Form.Item
                label={t("Shipping Cost")}
                labelAlign="left"
                name="shipping_cost"
                rules={[
                  {
                    required: true,
                    message: t("Please input shipping cost!"),
                  },
                ]}
              >
                {data?.status != 2 && data?.status != 3 && data?.status != 1 ? (
                  <Input
                    type="number"
                    placeholder={t("Please input shipping cost")}
                  />
                ) : (
                  <p>{BaseHelper.formatVND(data?.shipping_cost || 0)}</p>
                )}
              </Form.Item>
              <Form.Item
                label={t("Shipping Unit")}
                labelAlign="left"
                name="shipping_unit"
                rules={[
                  {
                    required: true,
                    message: t("Please input shipping unit!"),
                  },
                ]}
              >
                {data?.status != 2 && data?.status != 3 && data?.status != 1 ? (
                  <Input placeholder={t("Please input shipping unit")} />
                ) : (
                  <p>{data?.shipping_unit}</p>
                )}
              </Form.Item>
              <Form.Item label={t("Status")} labelAlign="left" name="status">
                <Tag color={statusColor}>{statusName}</Tag>
              </Form.Item>
              <RenderIf isTrue={data?.status != 2 && data?.status != 3}>
                <>
                  <div className="d-flex flex-wrap justify-content-between mb-2">
                    <RenderIf isTrue={data?.status == 0}>
                      <Button
                        htmlType="submit"
                        type="primary"
                        style={{ width: "48.75%" }}
                      >{`${t("Confirm Delivery")}`}</Button>
                    </RenderIf>
                    <RenderIf isTrue={data?.status == 1}>
                      <Button
                        className="btn-success"
                        block
                        style={{ width: "48.75%" }}
                        onClick={confirmSuccessHandler}
                      >{`${t("Confirm Order Successfully")}`}</Button>
                    </RenderIf>
                    <Button
                      className="btn-danger"
                      style={{ width: "48.75%" }}
                      onClick={cancelHandler}
                    >{`${t("Cancel Order")}`}</Button>
                  </div>
                </>
              </RenderIf>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="12" lg={5} className="mb-4">
        <CCard>
          <CCardHeader>{`${t("List Products")}`}</CCardHeader>
          <CCardBody>
            <Table
              className="overflow-auto"
              dataSource={data?.products || []}
              columns={columns}
              pagination={pagination}
            />
          </CCardBody>
        </CCard>
        {data?.gifts ? (
          <>
            <CCard>
              <CCardHeader>{`${t("List Appreciation Products")}`}</CCardHeader>
              <CCardBody>
                <Table
                  className="overflow-auto"
                  dataSource={data?.gifts || []}
                  columns={columnsGift}
                  pagination={pagination}
                />
              </CCardBody>
            </CCard>
          </>
        ) : (
          <></>
        )}
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(OrderDetail);
