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
import { getListProducts, getLazyProducts } from "src/services/product";
import { withNamespaces } from "react-i18next";
import BaseHelper from "src/services/helper";

const ListProduct = ({ t }) => {
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
      dataIndex: "name",
      render: (name) => <>{name}</>,
    },
    {
      title: t("Price"),
      dataIndex: "price",
      render: (price) => <>{BaseHelper.formatVND(price || 0)}</>,
      sorter: (a, b) => {
        return a.price - b.price;
      },
      sortDirections: ["ascend", "descend", "ascend"],
      defaultSortOrder: "ascend",
    },
    {
      title: t("Category"),
      dataIndex: "category",
      render: (category) => {
        return <>{category.map((item) => item.name).join(", ")}</>;
      },
    },

    {
      title: t("Status"),
      dataIndex: "status",
      render: (status = 0) => {
        let color = Status.pros.filter((item) => item.id == status)[0].color;
        let name = Status.pros.filter((item) => item.id == status)[0].name;
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
      title: t("Image"),
      dataIndex: "image",
      render: (avatar) => (
        <LazyLoadImage
          src={avatar}
          alt="product-img"
          // shape="square"
          style={{ width: "64px" }}
          // size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 64, xxl: 64 }}
        />
      ),
    },
    {
      title: t("Action"),
      dataIndex: "_id",
      render: (_id) => {
        return (
          <>
            <Space size="middle">
              <Link to={`/products/${_id}`}>{t("Detail")}</Link>
            </Space>
          </>
        );
      },
    },
  ];

  const changeKeyTab = async (id) => {
    let res = await getLazyProducts(pagination, id == "all" ? null : id);
    if (res?.status == 200 || res?.status == 204) {
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
          ...pagination,
          total: res.data.paginationInfo.total,
        });
      }
    } else {
      notification.error({
        message: t(`Notification`),
        description: `${res.message || "Get list product error!"}`,
        placement: `bottomRight`,
        duration: 1.5,
      });
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    let key = pagination.pageSize * (pagination.current - 1) + 1;
    getListProducts(
      { ...pagination, page: pagination.current },
      null,
      (res) => {
        if (res.status == 200 || res?.status == 204) {
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
              ...pagination,
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
    getListProducts(pagination, null, (res) => {
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
            ...pagination,
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
  }, [categories]);

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>{t("List Products")}</CCardHeader>
          <CCardBody>
            <Tabs onChange={changeKeyTab}>
              <Tabs.TabPane tab={"ALL"} key={"all"}>
                <Table
                  className="overflow-auto"
                  columns={columns}
                  dataSource={data}
                  pagination={pagination}
                  onChange={handleTableChange}
                />
              </Tabs.TabPane>
              {Object.keys(categories)?.length > 0 ? (
                <>
                  {categories.map((item, idx) => {
                    return (
                      <Tabs.TabPane tab={item?.name} key={item?._id}>
                        <React.Suspense
                          fallback={
                            <div className="d-flex justify-content-center">
                              <Spin />
                            </div>
                          }
                        >
                          <Table
                            className="overflow-auto"
                            columns={columns}
                            dataSource={data}
                            pagination={pagination}
                            onChange={handleTableChange}
                          />
                        </React.Suspense>
                      </Tabs.TabPane>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </Tabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(ListProduct);
