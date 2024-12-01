import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Navigation from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";
import { axiosInstance } from "../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCustomers } from "../../store/actions/customerAction";
import { useEffect } from "react";
import { toast } from "sonner";
import EditCustomerModal from "../../component/modal/EditCustomerModal";



const Customer = () => {
  // Akses data Redux
  const token = useSelector((state) => state.auth.authData)
  const dispatch = useDispatch()
  const kons = useSelector((store) => store.customer.customers)


  // Fungsi Mengambil Data Pelanggan
  const getCustomers = async () => {
    // Authentication
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const response = await axiosInstance.get('/customers', {headers})
      dispatch(setCustomers(response.data.data))
    } catch (error) {
      console.log(error)
    }
  }


  // FUngsi Menghapus data pelanggan
  const deleteCustomer = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const result = await axiosInstance.delete(`/customers/${id}`, {headers})

      if (result.status === 204) {
        toast.success("Delete success")
        getCustomers()
      }
    } catch (error) {
      toast.error("Delete failed!")
      console.error(error.message)
    }
  }




  useEffect(() => {
    getCustomers()
  }, [])


  return (
    <>
      <div>
        <Navigation />
        <div className="flex">
          <div>
            <Sidebar />
          </div>
          <div className="flex flex-col p-8 gap-8 w-full">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">CUSTOMER</h2>
              <Button>Tambah Customer</Button>
            </div>
            <div>
              <Table aria-label="Customer">
                <TableHeader>
                  <TableColumn>No</TableColumn>
                  <TableColumn>Nama Customer</TableColumn>
                  <TableColumn>Nomer Handphone</TableColumn>
                  <TableColumn>Alamat</TableColumn>
                  <TableColumn className="flex items-center justify-center">
                    Action
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {kons.map((kons, index) => {
                    return (
                      <TableRow key="id">
                        <TableCell key="Nomer">{index + 1}</TableCell>
                        <TableCell key="Name">{kons.name}</TableCell>
                        <TableCell key="Phone Number">{kons.phoneNumber}</TableCell>
                        <TableCell key="Address">{kons.address}</TableCell>
                        <TableCell className="flex justify-between">
                          <EditCustomerModal />
                          <Button onClick={() => deleteCustomer(kons.id)}>Hapus</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Customer;
