import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CSmartTable } from "@coreui/react-pro";
import { Status } from "src/configs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Table,
  // Tag,
  Space,
  Tabs,
  notification,
  Avatar,
  Tag,
  Spin,
} from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import BaseHelper from "src/services/helper";
import { getListDiscounts } from "src/services/discount";
import moment from "moment";

const ListDiscountCode = ({ t }) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [data, setData] = useState();
  const columns = [
    {
      title: t("ID"),
      dataIndex: "key",
    },
    {
      title: t("Name"),
      dataIndex: "name",
      render: (name) => <>{name}</>,
    },
    {
      title: t("Code"),
      dataIndex: "code",
      render: (code) => <>{code}</>,
    },
    {
      title: t("Discount Amount"),
      dataIndex: "discount_amount",
      render: (discount_amount) => <>{discount_amount}</>,
    },
    {
      title: t("Discount Type"),
      dataIndex: "discount_type",
      render: (status = 0) => {
        let name = Status.discount_type.filter((item) => item.id == status)[0]
          .name;
        return <>{name}</>;
      },
    },
    {
      title: t("Amount Type"),
      dataIndex: "amount_type",
      render: (status = 0) => {
        let name = Status.amount_type.filter((item) => item.id == status)[0]
          .name;
        return <>{name}</>;
      },
    },
    {
      title: t("Expired Time"),
      dataIndex: "expired_time",
      render: (expired) => {
        return <>{moment(expired).format("HH:mm DD-MM-YYYY")}</>;
      },
    },
    {
      title: t("Status"),
      dataIndex: "total_remaining",
      render: (total_remaining = 0) => {
        let status = total_remaining == 0 ? 1 : 0;
        let color = Status.discount_status.filter(
          (item) => item.id == status
        )[0].color;
        let name = Status.discount_status.filter((item) => item.id == status)[0]
          .name;
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
    },
    {
      title: t("Action"),
      dataIndex: "_id",
      render: (_id) => {
        return (
          <>
            <Space size="middle">
              <Link to={`/discount-codes/${_id}`}>{t("Detail")}</Link>
            </Space>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    console.log(pagination);
  }, [pagination]);
  const handleTableChange = (pagination, filters, sorter) => {
    let key = pagination.pageSize * (pagination.current - 1) + 1;
    getListDiscounts({ ...pagination, page: pagination.current }, (res) => {
      if (res.status == 200 || res.status == 204) {
        if (Object.keys(res).length == 0) {
          setData([]);
          setPagination({
            ...pagination,
            total: 0,
            pageSize: pagination.limit,
          });
        } else {
          res.data.data.forEach((item) => {
            item.key = key++;
          });
          setData(res.data.data);
          setPagination({
            ...res.data.paginationInfo,
            total: res.data.paginationInfo.total,
            pageSize: res.data.paginationInfo.limit,
          });
        }
      } else {
        notification.error({
          message: t(`Notification`),
          description: `${res.message}`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    });
  };

  useEffect(() => {
    getListDiscounts(pagination, (res) => {
      console.log(res);
      if (res.status == 200 || res.status == 204) {
        let key = 1;
        if (Object.keys(res).length == 0) {
          setData([]);
          setPagination({
            ...pagination,
            total: 0,
            pageSize: pagination.limit,
          });
        } else {
          res.data.data.forEach((item) => {
            item.key = key++;
          });
          setData(res.data.data);
          setPagination({
            ...res.data.paginationInfo,
            total: res.data.paginationInfo.total,
            pageSize: res.data.paginationInfo.limit,
          });
        }
      } else {
        notification.error({
          message: t(`Notification`),
          description: `${res.message}`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    });
  }, []);

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>{t("List Customers")}</CCardHeader>
          <CCardBody>
            <Table
              className="overflow-auto"
              columns={columns}
              dataSource={data}
              pagination={pagination}
              onChange={handleTableChange}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(ListDiscountCode);
