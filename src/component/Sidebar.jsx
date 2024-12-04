import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState()
//   const navigate = useNavigate()


  const handleClick = (path) => {
    setIsOpen(!isOpen)
    navigate(path)
  }

  return (
    <div className="h-screen bg-gray-800 text-white w-52 p-4 hidden md:block">
      <div className="items-center mb-4">
      </div>
      <div className="flex flex-col items-center gap-10">
        <button onClick={() => handleClick("/dashboard-customer") }>Customer</button>
        <button onClick={() => handleClick("/dashboard-product")}>Product</button>
        <button onClick={() => handleClick("/dashboard-transaction")}>Transaksi</button>
      </div>
    </div>
  );
};

export default Sidebar;