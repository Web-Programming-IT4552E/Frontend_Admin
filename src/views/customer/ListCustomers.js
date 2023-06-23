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
import { getListCustomers } from "src/services/customer";
import { withNamespaces } from "react-i18next";
import BaseHelper from "src/services/helper";

const ListCustomers = ({ t }) => {
  const categories = useSelector((state) => state).categories;
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
      dataIndex: "fullname",
      render: (fullname) => <>{fullname}</>,
    },
    {
      title: t("Email"),
      dataIndex: "email",
      render: (email) => <>{email}</>,
    },
    {
      title: t("Rank"),
      dataIndex: "rank",
      render: (status = 0) => {
        let color = Status.rank.filter((item) => item.id == status)[0]?.color;
        let name = Status.rank.filter((item) => item.id == status)[0]?.name;
        return (
          <>
            <Tag color={color} key={name}>
              {name}
            </Tag>
          </>
        );
      },
      filters: [
        {
          text: "Bronze",
          value: 0,
        },
        {
          text: "Silver",
          value: 1,
        },
        {
          text: "Gold",
          value: 2,
        },
        {
          text: "Diamond",
          value: 3,
        },
      ],
      filterMode: "tree",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      render: (status = 0) => {
        let color = Status.users.filter((item) => item.id == status)[0]?.color;
        let name = Status.users.filter((item) => item.id == status)[0]?.name;
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
              <Link to={`/customers/${_id}`}>{t("Detail")}</Link>
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
    console.log("Hello filters", filters);
    let key = pagination.pageSize * (pagination.current - 1) + 1;
    getListCustomers(
      { ...pagination, page: pagination.current },
      filters,
      (res) => {
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
      }
    );
  };

  useEffect(() => {
    getListCustomers(pagination, {}, (res) => {
      console.log(res);
      if (res.status == 200) {
        let key = 1;
        res.data.data.forEach((item) => {
          item.key = key++;
        });
        setData(res.data.data);
        setPagination({
          ...res.data.paginationInfo,
          total: res.data.paginationInfo.total,
          pageSize: res.data.paginationInfo.limit,
        });
      } else {
        notification.error({
          message: t(`Notification`),
          description: `${res.message}`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    });
  }, [categories]);

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

export default withNamespaces()(ListCustomers);
