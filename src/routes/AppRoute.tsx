import { Route, Routes } from "react-router-dom"
import { Layout } from "../components/layout/Layout"
import { Dashboard } from "../features/dashboard/pages/Dashboard"
import { Products } from "../features/products/pages/Products"
import { OrderManagement } from "../features/order_Management/pages/OrderManagement"
import { Categories } from "../features/categories/pages/Categories"
import { Customers } from "../features/customers/pages/Customers"
import { Login } from "../features/auth/pages/Login"
import AddProduct from "../features/products/pages/AddProductsModal"
import  Brands  from "../features/brands/page/Brands"
import Profile from "../features/profile/page/Profile"
import ProtectedRoute from "./ProtectedRoute"
import { Banner } from "../features/banner/page/Banner"
import { BannerUpdate } from "../features/banner/page/BannerUpdate"
import { BannerCreate } from "../features/banner/page/BannerCreate"



export const AppRoute = () => {
  return (
    <Routes>
        <Route element={<ProtectedRoute/>} >
            <Route element={<Layout/>}>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="products/add" element={<AddProduct/>}/>
              <Route path="products/edit/:id" element={<AddProduct/>}/>
              <Route path="/orders" element={<OrderManagement/>}/>
              <Route path="/categories" element={<Categories/>}/>
              <Route path="/customers" element={<Customers/>}/>
              <Route path="/brands" element={<Brands/>}/>
              <Route path="/banner" element={<Banner/>}/>
              <Route path="/banner/:id" element={<BannerUpdate />} />
              <Route path="/banner/add" element={<BannerCreate />} />
              <Route path="/profile" element={<Profile/>}/>
            </Route>
            
        </Route>

        <Route path="/login" element={<Login/>}/>
        
    </Routes>
  )
}
