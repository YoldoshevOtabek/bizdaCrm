export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  _count?: { orders: number; reviews: number };
  totalOrders: number;
  totalSpent: number;
};
