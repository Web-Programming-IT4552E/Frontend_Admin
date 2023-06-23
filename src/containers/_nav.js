import React from "react";
import CIcon from "@coreui/icons-react";
import { Roles } from "src/configs";

const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["MAIN"],
    permission: [Roles.ADMIN],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["LISTS"],
    permission: [Roles.ADMIN],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Orders",
    icon: "cil-user",
    permission: [Roles.ADMIN],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List Orders",
        to: "/orders",
        permission: [Roles.ADMIN],
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Products",
    icon: "cil-car-alt",
    permission: [Roles.ADMIN],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List Products",
        to: "/products",
        permission: [Roles.ADMIN],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add Product",
        to: "/products/create",
        permission: [Roles.ADMIN, Roles.OPERATOR],
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Customers",
    icon: "cil-car-alt",
    permission: [Roles.ADMIN],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List Customers",
        to: "/customers",
        permission: [Roles.ADMIN],
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Discount Codes",
    icon: "cil-car-alt",
    permission: [Roles.ADMIN],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List Discount Codes",
        to: "/discount-codes",
        permission: [Roles.ADMIN],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Create Discount Code",
        to: "/discount-codes/create",
        permission: [Roles.ADMIN],
      },
    ],
  },
];

export default _nav;
