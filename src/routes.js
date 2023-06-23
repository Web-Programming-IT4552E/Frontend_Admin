import React from "react";
import { Roles } from "./configs";

// const ListCars = React.lazy(() => import('./views/hostCar/ListCar'));
const ListProducts = React.lazy(() => import("./views/product/ListProduct"));
const ProductDetail = React.lazy(() => import("./views/product/ProductDetail"));
const AddProduct = React.lazy(() => import("./views/product/AddProduct"));
const ListOrders = React.lazy(() => import("./views/order/ListOrders"));
const OrderDetail = React.lazy(() => import("./views/order/OrderDetail"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Profile = React.lazy(() => import("./views/user/Profile"));
const ListCustomers = React.lazy(() =>
  import("./views/customer/ListCustomers")
);
const CustomerDetail = React.lazy(() =>
  import("./views/customer/CustomerDetail")
);
const ListDiscountCode = React.lazy(() =>
  import("./views/discount_code/ListDiscountCode")
);
const DiscountCodeDetail = React.lazy(() =>
  import("./views/discount_code/DiscountCodeDetail")
);
const CreateDiscountCode = React.lazy(() =>
  import("./views/discount_code/CreateDiscountCode")
);
const ChangePassword = React.lazy(() => import("./views/user/ChangePassword"));

const routes = [
  { path: "/", exact: true, component: Dashboard, name: "Home" },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    permission: [Roles.ADMIN, Roles.ADMIN, Roles.OPERATOR, Roles.ANALYST],
  },
  // SALE's services route
  {
    path: "/products",
    name: "Products",
    component: ListProducts,
    permission: [Roles.ADMIN],
    exact: true,
  },
  {
    path: "/products/create",
    name: "Add Product",
    component: AddProduct,
    permission: [Roles.ADMIN],
    exact: true,
  },
  {
    path: "/products/:id",
    name: "Product Detail",
    component: ProductDetail,
    permission: [Roles.ADMIN],
    exact: true,
  },
  {
    path: "/discount-codes/create",
    name: "Add Discount Code",
    component: CreateDiscountCode,
    permission: [Roles.ADMIN],
    exact: true,
  },
  {
    path: "/discount-codes/:id",
    name: "Discount Code Detail",
    component: DiscountCodeDetail,
    permission: [Roles.ADMIN],
    exact: true,
  },
  {
    path: "/discount-codes",
    name: "Discount Codes",
    component: ListDiscountCode,
    permission: [Roles.ADMIN],
    exact: true,
  },

  {
    path: "/discount_codes/:id",
    name: "Product Detail",
    component: ProductDetail,
    permission: [Roles.ADMIN],
    exact: true,
  },
  {
    path: "/orders",
    name: "Orders",
    component: ListOrders,
    permission: [Roles.ADMIN],
    exact: true,
  },
  {
    path: "/orders/:id",
    name: "Order Detail",
    component: OrderDetail,
    permission: [Roles.ADMIN],
    exact: true,
  },
  {
    path: "/customers",
    name: "Customers",
    component: ListCustomers,
    permission: [Roles.ADMIN],
    exact: true,
  },
  {
    path: "/customers/:id",
    name: "Order Detail",
    component: CustomerDetail,
    permission: [Roles.ADMIN],
    exact: true,
  },
  // User's route
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    permission: [Roles.ADMIN, Roles.ADMIN, Roles.OPERATOR, Roles.ANALYST],
    exact: true,
  },
  {
    path: "/change-password",
    name: "Change Password",
    component: ChangePassword,
    permission: [Roles.ADMIN, Roles.ADMIN, Roles.OPERATOR, Roles.ANALYST],
    exact: true,
  },
];

export default routes;
