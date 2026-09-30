import {
  House,
  ShoppingCart,
  Users,
  LayoutGrid,
  Package,
  Tags,
  UserCircle,
  PanelsTopLeft,
  Image,
} from "lucide-react";

import type { SidebarMenuType } from "../components/ui/sidebar";

export const sidebarMenu: SidebarMenuType[] = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: House,
  },
  {
    id: 2,
    title: "Order Management",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    id: 3,
    title: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    id: 4,
    title: "Categories",
    path: "/categories",
    icon: LayoutGrid,
  },
  {
    id: 5,
    title: "Products",
    path: "/products",
    icon: Package,
  },
  {
    id: 6,
    title: "Brands",
    path: "/brands",
    icon: Tags,
  },
  {
    id: 7,
    title: "Banner",
    path: "/banner",
    icon: Image,
  },
  {
    id: 8,
    title: "Profile",
    path: "/profile",
    icon: UserCircle,
  },
];