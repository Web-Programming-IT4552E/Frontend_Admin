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
  DatePicker,
  Upload,
  Avatar,
  Divider,
  InputNumber,
} from "antd";
import { withNamespaces } from "react-i18next";
import { selectFields, compareList } from "src/configs/Condition";
import { createDiscount } from "src/services/discount";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import FieldUsable from "./FieldUsable";
import { Status } from "src/configs";
import { useHistory } from "react-router";
import moment from "moment";
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
const CreateDiscountCode = ({ t }) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (values) => {
    let dataApplyingCondition = values.customer_applying_condition.map(
      (item) => {
        return item["nestedFields"];
      }
    );
    Modal.confirm({
      title: t(`Create Discount Code`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to create this discount code? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        createDiscount(
          {
            ...values,
            customer_applying_condition: dataApplyingCondition,
          },
          (res) => {
            if (res.status === 200) {
              notification.success({
                message: t(`Notification`),
                description: `Create discount code successfully`,
                placement: `bottomRight`,
                duration: 1.5,
              });
              // setIsFinalUpdate(true)
              history.push("/discount-codes");
            } else {
              notification.error({
                message: t(`Notification`),
                description: `Create discount code failed.`,
                placement: `bottomRight`,
                duration: 1.5,
              });
            }
          }
        );
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
  };

  return (
    <div id="discount">
      <CRow>
        <CCol className="mb-4">
          <CCard>
            <CCardHeader
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              {t("Create Discount Code")}
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
                      message: t("Please input name!"),
                    },
                  ]}
                >
                  <Input placeholder={t("Please input name")} />
                </Form.Item>
                <Form.Item
                  label={t("Code")}
                  labelAlign="left"
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: t("Please input code!"),
                    },
                  ]}
                >
                  <Input placeholder={t("Please input code")} />
                </Form.Item>
                <Form.Item
                  label={t("Description")}
                  labelAlign="left"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: t("Please input description!"),
                    },
                  ]}
                >
                  <Input.TextArea
                    allowClear
                    className="mb-2"
                    placeholder={t("Please input description")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("Discount Type")}
                  labelAlign="left"
                  initialValue={
                    Object.keys(Status.discount_type).length > 0
                      ? Status.discount_type[0].id
                      : "0"
                  }
                  name="discount_type"
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select category"
                    optionFilterProp="category"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {Status.discount_type.map((item, idx) => (
                      <Select.Option value={item.id} key={idx}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label={t("Amount Type")}
                  labelAlign="left"
                  initialValue={
                    Object.keys(Status.amount_type).length > 0
                      ? Status.amount_type[0].id
                      : "0"
                  }
                  name="amount_type"
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select category"
                    optionFilterProp="category"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {Status.amount_type.map((item, idx) => (
                      <Select.Option value={item.id} key={idx}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label={t("Discount Amount")}
                  labelAlign="left"
                  name="discount_amount"
                  rules={[
                    {
                      required: true,
                      message: t("Please input discount amount!"),
                    },
                  ]}
                >
                  <InputNumber
                    className="w-100"
                    type="number"
                    placeholder={t("Please input discount amount")}
                  />
                </Form.Item>
                <Form.List name="customer_applying_condition">
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map((field, index) => {
                          return (
                            <div key={field.key}>
                              <Divider>
                                {t("Group")} {index + 1}
                              </Divider>
                              <Form.List name={[field.name, "nestedFields"]}>
                                {(
                                  nestedFields,
                                  { add: addChild, remove: removeChild }
                                ) => {
                                  return (
                                    <>
                                      {nestedFields.map((nestField, idx) => {
                                        return (
                                          <React.Fragment
                                            key={`${idx}-${index}`}
                                          >
                                            <div className="d-flex">
                                              <FieldUsable
                                                nestField={nestField}
                                                compareList={compareList}
                                                selectFields={selectFields}
                                              />
                                              <Button
                                                ghost
                                                type="danger"
                                                className="dynamic-delete-button d-flex align-items-center justify-content-center"
                                                onClick={() =>
                                                  removeChild(nestField.name)
                                                }
                                                icon={<MinusCircleOutlined />}
                                              ></Button>
                                            </div>
                                          </React.Fragment>
                                        );
                                      })}
                                      <Form.Item>
                                        <Button
                                          type="primary"
                                          ghost
                                          onClick={() => {
                                            addChild();
                                          }}
                                          className={"w-100"}
                                        >
                                          <PlusOutlined />{" "}
                                          {t("Add Condition to Group")}{" "}
                                          {`${index + 1}`}
                                        </Button>
                                      </Form.Item>
                                    </>
                                  );
                                }}
                              </Form.List>

                              {fields.length > 0 ? (
                                <>
                                  <Button
                                    type="danger"
                                    className="mt-2 dynamic-delete-button d-flex align-items-center justify-content-center w-100"
                                    onClick={() => remove(field.name)}
                                    icon={<MinusCircleOutlined />}
                                  >
                                    {t("Remove Above Group")}
                                  </Button>
                                </>
                              ) : null}
                            </div>
                          );
                        })}
                        <Divider />
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                            }}
                            className="w-100 "
                          >
                            <PlusOutlined /> {t("Add Group")}
                          </Button>
                        </Form.Item>
                        <Divider />
                      </div>
                    );
                  }}
                </Form.List>

                <Form.Item
                  label={t("Min Order Value")}
                  labelAlign="left"
                  name="min_order_value"
                  rules={[
                    {
                      required: true,
                      message: t("Please input min order value!"),
                    },
                  ]}
                >
                  <InputNumber
                    className="w-100"
                    type="number"
                    placeholder={t("Please input min order value")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("Total remaining")}
                  labelAlign="left"
                  name="total_remaining"
                  rules={[
                    {
                      required: true,
                      message: t("Please input total remaining!"),
                    },
                  ]}
                >
                  <InputNumber
                    className="w-100"
                    type="number"
                    placeholder={t("Please input total remaining")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("Maximum Apply Per User")}
                  labelAlign="left"
                  name="maximum_apply_time_per_user"
                  rules={[
                    {
                      required: true,
                      message: t("Please input maximum_apply_time_per_user!"),
                    },
                  ]}
                >
                  <InputNumber
                    className="w-100"
                    type="number"
                    placeholder={t("Please input maximum_apply_time_per_user")}
                  />
                </Form.Item>
                <Form.Item
                  label={t("Expired Time")}
                  labelAlign="left"
                  name="expired_time"
                  rules={[
                    {
                      required: true,
                      message: t("Please choose expired time!"),
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="HH:mm DD/MM/YYYY"
                    showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
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
    </div>
  );
};

export default withNamespaces()(CreateDiscountCode);
