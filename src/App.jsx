import { Route, Routes } from "react-router-dom"
import Footer from "./component/Footer.jsx"
import Navigation from "./component/Navbar.jsx"
import Sidebar from "./component/Sidebar.jsx"
import LoginPage from "./pages/auth/LoginPage.jsx"
import SignupPage from "./pages/auth/SignupPage.jsx"
import Customer from "./pages/dashboard/Customer.jsx"
import Product from "./pages/dashboard/Product.jsx"
import Transaction from "./pages/dashboard/Transaction.jsx"
import { Toaster } from "sonner"




function App() {

  return (
    <>
      <Toaster position="top-center"/>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<SignupPage />} path="/sign-up" />
        <Route element={<Customer />} path="/dashboard-customer" />
        <Route element={<Product />} path="/dashboard-product" />
        <Route element={<Transaction />} path="/dashboard-transaction" />
      </Routes>
    </>
  )
}

export default App
