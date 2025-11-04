import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequireAuth from '../Auth/RequireAuth'
import Layout from '../components/Layout/Layout'
import Home from '../pages/home/Home'
import Login from '../pages/Login/Login'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import Register from '../pages/Register/Register'
import PublicOnlyRoute from '../Auth/PublicOnlyRoute'
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="productDetail/:id" element={<ProductDetail />}></Route>
          </Route>
        </Route>
        <Route path="auth" element={<PublicOnlyRoute/>}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
