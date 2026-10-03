import { Route, Routes } from "react-router-dom";
import Dashboard from "../features/dashboard/page/Dashboard";
import OrderManagment from "../features/order/page/OrderManagment";
import ProductDeatils from "../features/products/page/ProductDetails";
import Categories from "../features/categories/page/Categories";
import Customers from "../features/customers/page/Customers";
import CustomerDetails from "../features/customers/pages/CustomerDetails";
import LoginPage from "../features/auth/page/LoginPage";
import NotFound from "../features/notFound/page/NotFound";
import Profile from "../features/profiles/page/Profile";
import ProtectedRoute from "./ProtectedRoute";
import CategoriesDetails from "../features/categories/page/CategoriesDetails";
import Products from "../features/products/page/Products";
import OrderDetails from "../features/order/page/OrderDetails";
import Banner from "../features/banner/pages/Banner";
import Brands from "../features/brands/pages/Brands";
import BannerDetail from "../features/banner/pages/BannerDetail";
import BrandDetails from "../features/brands/pages/BrandDetails";
import AuthRoute from "./AuthRoute";

export default function AppRoute() {
    return (
        <>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/order" element={<OrderManagment />} />
                    <Route path="/order/:id" element={<OrderDetails />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/customers/:id" element={<CustomerDetails />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:id" element={<CategoriesDetails />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDeatils />} />
                    <Route path="/banner" element={<Banner />} />
                    <Route path="/banner/:id" element={<BannerDetail />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/brands/:id" element={<BrandDetails />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}
