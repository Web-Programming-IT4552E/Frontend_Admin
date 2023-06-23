const Status = {
  discount_status: [
    {
      id: 0,
      name: "Active",
      color: "green",
      text: "Active",
    },
    {
      id: 1,
      name: "Inactive",
      color: "red",
      text: "Inactive",
    },
  ],
  discount_type: [
    {
      id: 0,
      name: "User Discount",
    },
    {
      id: 1,
      name: "Order discount ",
    },
  ],
  amount_type: [
    {
      id: 0,
      name: "Direct",
    },
    {
      id: 1,
      name: "Percentage",
    },
  ],
  rank: [
    {
      id: 0,
      name: "Bronze",
      text: "Bronze",
      color: "#b18f52",
    },
    {
      id: 1,
      name: "Silver",
      text: "Silver",
      color: "#D3D3D3",
    },
    {
      id: 2,
      name: "Gold",
      text: "Gold",
      color: "#FFD700",
    },
    {
      id: 3,
      name: "Diamond",
      text: "Diamond",
      color: "cyan",
    },
  ],
  products: [
    {
      id: 0,
      name: "Active",
      color: "green",
      text: "Active",
    },
    {
      id: 1,
      name: "Pending",
      color: "yellow",
      text: "Pending",
    },
    {
      id: 2,
      name: "Success",
      color: "purple",
      text: "Success",
    },
    {
      id: 3,
      name: "Canceled",
      color: "volcano",
      text: "Canceled",
    },
  ],
  pros: [
    {
      id: 0,
      name: "In Stock",
      color: "green",
      text: "In stock",
    },
    {
      id: 1,
      name: "Out of Stock",
      color: "yellow",
      text: "Out of Stock",
    },
    {
      id: 2,
      name: "Sold Out",
      color: "volcano",
      text: "Sold Out",
    },
  ],
  users: [
    {
      id: 0,
      name: "New",
      color: "lime",
      text: "New",
    },
    {
      id: 1,
      name: "Active",
      color: "green",
      text: "Active",
    },
    {
      id: 2,
      name: "Block",
      color: "red",
      text: "Block",
    },
  ],
};

export default Status;

export const SuccessStatus = [200, 201, 202, 203, 204];
