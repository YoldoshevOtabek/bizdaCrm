export type OrderCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type OrderAddress = {
  title?: string;
  city?: string;
  region?: string;
  district?: string;
  street?: string;
  house?: string;
};

export type OrderApi = {
  id: string;
  orderNumber: string;
  createdAt: string;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  user?: OrderCustomer;
  customerSnapshot?: OrderCustomer;
  addressSnapshot?: OrderAddress;
  items?: {
    productName?: string;
    productImage?: string;
  }[];
};

export type OrderRow = {
  key: string;
  orderNumber: string;
  customer: OrderCustomer;
  product: string;
  productImage: string;
  date: string;
  price: number;
  status: string;
};
