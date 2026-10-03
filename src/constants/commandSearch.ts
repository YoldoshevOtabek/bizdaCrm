import {
  BookmarkCheck,
  Box,
  Flag,
  LayoutDashboard,
  PlusCircle,
  Shapes,
  ShoppingCart,
  UserCircle,
  Users,
  type LucideIcon,
} from "lucide-react";

export type CommandGroup = "Pages" | "Create";

export type CommandItem = {
  id: string;
  label: string;
  hint: string;
  path: string;
  group: CommandGroup;
  icon: LucideIcon;
  keywords: string[];
};

export const commandItems: CommandItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    hint: "Overview",
    path: "/dashboard",
    group: "Pages",
    icon: LayoutDashboard,
    keywords: ["home", "asosiy", "statistika"],
  },
  {
    id: "orders",
    label: "Order Management",
    hint: "Orders",
    path: "/order",
    group: "Pages",
    icon: ShoppingCart,
    keywords: ["buyurtma", "order", "zakaz"],
  },
  {
    id: "customers",
    label: "Customers",
    hint: "Users",
    path: "/customers",
    group: "Pages",
    icon: Users,
    keywords: ["mijoz", "customer", "user"],
  },
  {
    id: "categories",
    label: "Categories",
    hint: "Catalog",
    path: "/categories",
    group: "Pages",
    icon: Shapes,
    keywords: ["kategoriya", "category"],
  },
  {
    id: "products",
    label: "Products",
    hint: "Catalog",
    path: "/products",
    group: "Pages",
    icon: Box,
    keywords: ["mahsulot", "product"],
  },
  {
    id: "banner",
    label: "Banner",
    hint: "Marketing",
    path: "/banner",
    group: "Pages",
    icon: Flag,
    keywords: ["banner", "reklama"],
  },
  {
    id: "brands",
    label: "Brands",
    hint: "Catalog",
    path: "/brands",
    group: "Pages",
    icon: BookmarkCheck,
    keywords: ["brend", "brand"],
  },
  {
    id: "profile",
    label: "Profile",
    hint: "Account",
    path: "/profile",
    group: "Pages",
    icon: UserCircle,
    keywords: ["profil", "account", "sozlama"],
  },
  {
    id: "create-product",
    label: "Add Product",
    hint: "Create",
    path: "/products?create=1",
    group: "Create",
    icon: PlusCircle,
    keywords: ["qoshish", "create", "new", "mahsulot", "product"],
  },
  {
    id: "create-category",
    label: "Add Category",
    hint: "Create",
    path: "/categories?create=1",
    group: "Create",
    icon: PlusCircle,
    keywords: ["qoshish", "create", "new", "kategoriya", "category"],
  },
  {
    id: "create-brand",
    label: "Add Brand",
    hint: "Create",
    path: "/brands?create=1",
    group: "Create",
    icon: PlusCircle,
    keywords: ["qoshish", "create", "new", "brend", "brand"],
  },
  {
    id: "create-banner",
    label: "Add Banner",
    hint: "Create",
    path: "/banner?create=1",
    group: "Create",
    icon: PlusCircle,
    keywords: ["qoshish", "create", "new", "banner"],
  },
];
