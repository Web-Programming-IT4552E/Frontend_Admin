import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CSmartTable } from "@coreui/react-pro";
import { Status } from "src/configs";
import { SuccessStatus } from "src/configs/Status";
import {
  Table,
  // Tag,
  Space,
  notification,
  Avatar,
  Tabs,
  Button,
  Tag,
  DatePicker,
} from "antd";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { getListOrders } from "src/services/order";
import BaseHelper from "src/services/helper";
import moment from "moment";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const ListOrders = ({ t }) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [keyTab, setKeyTab] = useState("0");
  const [rangeTime, setRangeTime] = useState();
  const [data, setData] = useState();
  const [statusFilter, setStatusFilter] = useState([]);
  const columns = [
    {
      title: t("ID"),
      dataIndex: "key",
    },
    {
      title: t("Name"),
      dataIndex: "shipping_address",
      render: (object) => <>{object?.receiver_name}</>,
    },
    {
      title: t("Phone number"),
      dataIndex: "shipping_address",
      render: (object) => <>{object?.receiver_phone_number}</>,
    },
    {
      title: t("Province"),
      dataIndex: "shipping_address",
      render: (object) => <>{object?.city}</>,
    },
    {
      title: t("District"),
      dataIndex: "shipping_address",
      render: (object) => <>{object?.district}</>,
    },
    {
      title: t("Ward"),
      dataIndex: "shipping_address",
      render: (object) => <>{object?.ward}</>,
    },
    {
      title: t("Address"),
      dataIndex: "shipping_address",
      render: (object) => <>{object?.address}</>,
    },
    {
      title: t("Total Price"),
      dataIndex: "total_product_cost",
      render: (price) => <>{BaseHelper.formatVND(price || 0)}</>,
      sorter: (a, b) => {
        return a.price - b.price;
      },
      sortDirections: ["ascend", "descend", "ascend"],
      defaultSortOrder: "ascend",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      render: (status = 0) => {
        let color = Status.products.filter((item) => item.id == status)[0]
          .color;
        let name = Status.products.filter((item) => item.id == status)[0].name;
        return (
          <>
            <Tag color={color} key={name}>
              {name}
            </Tag>
          </>
        );
      },
      sorter: (a, b) => {
        return a.status - b.status;
      },
      sortDirections: ["ascend", "descend", "ascend"],
      defaultSortOrder: "ascend",
      filters: statusFilter,
      onFilter: (value, record) => record.status == value,
    },
    {
      title: t("Action"),
      dataIndex: "_id",
      render: (_id) => {
        return (
          <>
            <Space size="middle">
              <Link to={`/orders/${_id}`}>{t("Detail")}</Link>
            </Space>
          </>
        );
      },
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    let key = pagination.pageSize * (pagination.current - 1) + 1;
    getListOrders(
      { ...pagination, page: pagination.current },
      keyTab,
      rangeTime,
      (res) => {
        if (SuccessStatus.indexOf(res.status) != -1) {
          if (res.data?.data) {
            res.data.data.forEach((item) => {
              item.key = key++;
            });
          }
          setData(res.data?.data ? res.data.data : []);
          setPagination({
            ...pagination,
            total: res.data.paginationInfo.total,
            pageSize: res.data.paginationInfo.limit,
          });
        } else {
          setData([]);
          setPagination({ ...pagination, total: 0 });
          notification.error({
            message: t(`Notification`),
            description: `${res.message}`,
            placement: `bottomRight`,
            duration: 1.5,
          });
        }
      }
    );
  };

  useEffect(() => {
    setStatusFilter(Status.products);
    getListOrders(pagination, keyTab, rangeTime, (res) => {
      if (SuccessStatus.indexOf(res.status) != -1) {
        let key = 1;
        if (Object.keys(res).length == 0) {
          setData([]);
          setPagination({
            ...pagination,
            total: 0,
            pageSize: pagination.limit,
          });
        } else {
          if (res.data?.data) {
            res.data.data.forEach((item) => {
              item.key = key++;
            });
          }
          setData(res.data?.data ? res.data.data : []);
          setPagination({
            ...pagination,
            total: res.data.paginationInfo.total,
            pageSize: res.data.paginationInfo.limit,
          });
          setData(res.data.data);
          setPagination({
            ...pagination,
            total: res.data.paginationInfo.total,
          });
        }
      } else {
        setData([]);
        setPagination({ ...pagination, total: 0 });
        notification.error({
          message: t(`Notification`),
          description: `${res.message || "Không có dữ liệu"}`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    });
  }, [keyTab, rangeTime]);

  const changeKeyTab = (value) => {
    setKeyTab(value);
  };
  const changeTime = (value) => {
    if (value && Object.keys(value).length == 2 && value[0] && value[1]) {
      let finalTime = `${moment(value[0]).toISOString()} ${moment(
        value[1]
      ).toISOString()}`;
      setRangeTime(finalTime);
    } else {
      setRangeTime("");
    }
  };
  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader className="d-flex justify-content-between">
            <p>{t("List Orders")}</p>
            <RangePicker onChange={changeTime} />
          </CCardHeader>
          <CCardBody>
            <Tabs
              activeKey={keyTab}
              defaultActiveKey="1"
              onChange={changeKeyTab}
            >
              <TabPane tab="Đơn hàng mới" key="0">
                <Table
                  className="overflow-auto"
                  columns={columns}
                  dataSource={data}
                  pagination={pagination}
                  onChange={handleTableChange}
                />
              </TabPane>
              <TabPane tab="Đơn hàng xác nhận đang giao hàng" key="1">
                <Table
                  className="overflow-auto"
                  columns={columns}
                  dataSource={data}
                  pagination={pagination}
                  onChange={handleTableChange}
                />
              </TabPane>
              <TabPane tab="Đơn hàng xác nhận giao thành công" key="2">
                <Table
                  className="overflow-auto"
                  columns={columns}
                  dataSource={data}
                  pagination={pagination}
                  onChange={handleTableChange}
                />
              </TabPane>
              <TabPane tab="Đơn hàng đã hủy" key="3">
                <Table
                  className="overflow-auto"
                  columns={columns}
                  dataSource={data}
                  pagination={pagination}
                  onChange={handleTableChange}
                />
              </TabPane>
            </Tabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(ListOrders);
