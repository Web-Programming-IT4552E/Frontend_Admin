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
  InputNumber,
  DatePicker,
  Upload,
  Avatar,
  Divider,
} from "antd";
import { withNamespaces } from "react-i18next";
import { selectFields, compareList } from "src/configs/Condition";
import { getDiscountDetail, disableDiscountCode } from "src/services/discount";
import { Status } from "src/configs";
import { useHistory, useLocation } from "react-router";
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
const DiscountCodeDetail = ({ t }) => {
  const [currentSelectField, setCurrentSelectField] = useState();
  const discount_id = useLocation().pathname.split("/")[2];
  const [form] = Form.useForm();
  const history = useHistory();
  const [dataDetail, setDataDetail] = useState();

  const onFinish = () => {
    Modal.confirm({
      title: t(`Disable Discount Code`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to disable this discount code? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        disableDiscountCode(discount_id, (res) => {
          if (res.status === 200) {
            notification.success({
              message: t(`Notification`),
              description: `Disable discount code successfully`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            history.push("/discount-codes");
          } else {
            notification.error({
              message: t(`Notification`),
              description: `Disable discount code failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop disable product`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };

  useEffect(() => {
    getDiscountDetail(discount_id, (res) => {
      res.data.expired_time = moment(
        new Date(res.data.expired_time),
        "HH:mm DD/MM/YYYY"
      );

      setDataDetail(res.data);
      form.setFieldsValue(res.data);
    });
  }, [discount_id]);

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
                  <Input placeholder={t("Please input name")} disabled />
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
                  <Input placeholder={t("Please input code")} disabled />
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
                    disabled
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
                    disabled
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
                    disabled
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
                  <Input
                    className="w-100"
                    placeholder={t("Please input discount amount")}
                    disabled
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
                                {(nestedFields, { add: addChild, remove }) => {
                                  console.log(nestedFields);
                                  return (
                                    <>
                                      {nestedFields.map((nestField) => {
                                        return (
                                          <React.Fragment key={nestField.key}>
                                            <div className="d-flex">
                                              <Space
                                                size={4}
                                                direction="horizontal"
                                                className="flex-wrap d-flex flex-grow-1 mb-2"
                                              >
                                                <Form.Item
                                                  // label="Object"
                                                  name={[
                                                    nestField.name,
                                                    "object",
                                                  ]}
                                                  rules={[{ required: true }]}
                                                  initialValue={selectFields[0]}
                                                >
                                                  <Select
                                                    disabled
                                                    onChange={(e) => {
                                                      console.log(e);
                                                      setCurrentSelectField({
                                                        value: e,
                                                        key: nestField.key,
                                                      });
                                                    }}
                                                  >
                                                    {selectFields.map(
                                                      (item, idx) => (
                                                        <Select.Option
                                                          value={item}
                                                          key={`${"idx"} + ${idx}`}
                                                        >
                                                          {item}
                                                        </Select.Option>
                                                      )
                                                    )}
                                                  </Select>
                                                </Form.Item>
                                                <Form.Item
                                                  // label="Condition"
                                                  name={[
                                                    nestField.name,
                                                    "condition",
                                                  ]}
                                                  rules={[{ required: true }]}
                                                  initialValue={compareList[0]}
                                                >
                                                  <Select disabled>
                                                    {compareList.map(
                                                      (item, idx) => (
                                                        <Select.Option
                                                          value={item}
                                                          key={`${"idx"} + ${idx}`}
                                                        >
                                                          {item}
                                                        </Select.Option>
                                                      )
                                                    )}
                                                  </Select>
                                                </Form.Item>
                                                <Form.Item
                                                  name={[
                                                    nestField.name,
                                                    "value",
                                                  ]}
                                                  // label="Value"
                                                  rules={[{ required: true }]}
                                                >
                                                  <Input
                                                    disabled
                                                    className="w-100"
                                                    placeholder="Please input value!"
                                                  />
                                                </Form.Item>
                                              </Space>
                                            </div>
                                          </React.Fragment>
                                        );
                                      })}
                                    </>
                                  );
                                }}
                              </Form.List>
                            </div>
                          );
                        })}
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
                  <Input
                    disabled
                    className="w-100"
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
                  <Input
                    disabled
                    className="w-100"
                    Input
                    placeholder={t("Please input total remaining")}
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
                    disabled
                    style={{ width: "100%" }}
                    format="HH:mm DD/MM/YYYY"
                    showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                  />
                </Form.Item>

                {dataDetail?.total_remaining != 0 ? (
                  <Button type="primary" block htmlType="submit">
                    {t("Disable")}
                  </Button>
                ) : (
                  <></>
                )}
              </Form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default withNamespaces()(DiscountCodeDetail);
