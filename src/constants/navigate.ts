import { FlagOutlined } from "@ant-design/icons"
import { BookmarkCheck, Box, LayoutDashboardIcon, LucideUserCircle, Shapes, ShoppingCart, Users } from "lucide-react"
import type { ElementType } from "react"

interface NavSidebar {
    id: string,
    path: string,
    label: string,
    icon: ElementType
}

export const sidebarRoutes: NavSidebar[] = [
    { id: "dashboard", path: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
    { id: "order", path: "/order", label: "Order Management", icon: ShoppingCart },
    { id: "custom", path: "/customers", label: "Customers", icon: Users },
    { id: "category", path: "/categories", label: "Categories", icon: Shapes },
    { id: "add", path: "/products", label: "Products", icon: Box },
    { id: "banner", path: "/banner", label: "Banner", icon: FlagOutlined },
    { id: "brands", path: "/brands", label: "Brands", icon: BookmarkCheck },
    { id: "profile", path: "/profile", label: "Profile", icon: LucideUserCircle }
]