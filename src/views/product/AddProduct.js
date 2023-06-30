import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Table,
  Space,
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
import { withNamespaces } from "react-i18next";
import { createProduct } from "src/services/product";
import { useHistory } from "react-router";
import BaseHelper from "src/services/helper";
import SubImages from "./SubImages";
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
const AddProduct = ({ t }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [avatarURL, setAvatarURL] = useState();
  const [subImages, setSubImages] = useState([]);
  const categories = useSelector((state) => state.categories);

  const handleUploadAvatar = (e) => {
    uploadImage(e.file.name, e.file, setAvatarURL);
  };

  const onFinish = (values) => {
    if (avatarURL) {
      values.image = avatarURL;
      Modal.confirm({
        title: t(`Create Product`),
        icon: <ExclamationCircleOutlined />,
        content: t(
          `You are going to create this product? Are you sure you want to do this? You can't reverse this`
        ),
        onOk() {
          createProduct(BaseHelper.formatData(values), (res) => {
            if (res.status === 201) {
              notification.success({
                message: t(`Notification`),
                description: `Create product successfully`,
                placement: `bottomRight`,
                duration: 1.5,
              });
              // setIsFinalUpdate(true)
              history.push("/products");
            } else {
              notification.error({
                message: t(`Notification`),
                description: `Create product failed.`,
                placement: `bottomRight`,
                duration: 1.5,
              });
            }
          });
        },
        onCancel() {
          notification.info({
            message: t(`Notification`),
            description: t(`Stop create product`),
            placement: `bottomRight`,
            duration: 1.5,
          });
        },
        centered: true,
      });
    } else {
      notification.error({
        message: t(`Notification`),
        description: `Please upload product image.`,
        placement: `bottomRight`,
        duration: 1.5,
      });
    }
  };

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            {t("Create Product")}
            <Upload showUploadList={false} customRequest={handleUploadAvatar}>
              {avatarURL ? (
                <Avatar
                  src={`${avatarURL}`}
                  alt=""
                  shape="square"
                  size={{
                    xs: 100,
                    sm: 100,
                    md: 100,
                    lg: 100,
                    xl: 100,
                    xxl: 100,
                  }}
                />
              ) : (
                <Avatar
                  src={window.location.origin + "/avatars/default-avatar.png"}
                  alt=""
                  shape="square"
                  size={{
                    xs: 100,
                    sm: 100,
                    md: 100,
                    lg: 100,
                    xl: 100,
                    xxl: 100,
                  }}
                />
              )}
            </Upload>
          </CCardHeader>
          <CCardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>{t("Add Sub Images")}</p>
            <SubImages subImages={subImages} setSubImages={setSubImages} />
          </CCardHeader>
          <CCardBody>
            <Form form={form} {...formItemLayout} onFinish={onFinish}>
              <Form.Item
                label={t("Name")}
                labelAlign="left"
                name="name"
                rules={[
                  {
                    required: true,
                    message: t("Please input product name!"),
                  },
                ]}
              >
                <Input placeholder={t("Please input product name")} />
              </Form.Item>
              <Form.Item
                label={t("Price")}
                labelAlign="left"
                name="price"
                rules={[
                  {
                    required: true,
                    message: t("Please input product price! (USD)"),
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder={t("Please input product price (USD)")}
                />
              </Form.Item>
              <Form.Item
                label={t("Category")}
                labelAlign="left"
                initialValue={
                  Object.keys(categories).length > 0
                    ? [categories[0]._id]
                    : undefined
                }
                name="category"
              >
                <Select
                  mode="multiple"
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select category"
                  optionFilterProp="category"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  options={categories.map((item) => {
                    return {
                      label: item?.name,
                      value: item?._id,
                    };
                  })}
                ></Select>
              </Form.Item>

              <Form.Item
                label={t("Width")}
                labelAlign="left"
                name="with"
                rules={[
                  {
                    required: true,
                    message: t("Please input product with!"),
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder={t("Please input product with")}
                />
              </Form.Item>
              <Form.Item
                label={t("Height")}
                labelAlign="left"
                name="height"
                rules={[
                  {
                    required: true,
                    message: t("Please input product height!"),
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder={t("Please input product height")}
                />
              </Form.Item>
              <Form.Item
                label={t("Mass")}
                labelAlign="left"
                name="mass"
                rules={[
                  {
                    required: true,
                    message: t("Please input product mass!"),
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder={t("Please input product mass")}
                />
              </Form.Item>
              <Form.Item
                label={t("Description")}
                labelAlign="left"
                name="description"
                rules={[
                  {
                    required: true,
                    message: t("Please input product description!"),
                  },
                ]}
              >
                <Input placeholder={t("Please input product description")} />
              </Form.Item>
              <Form.Item
                label={t("Stock")}
                labelAlign="left"
                name="stock"
                rules={[
                  {
                    required: true,
                    message: t("Please input product stock!"),
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder={t("Please input product stock")}
                />
              </Form.Item>
              <Button type="primary" block htmlType="submit">
                {t("Create")}
              </Button>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(AddProduct);
