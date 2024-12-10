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
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../lib/axios";
import { setProducts } from "../../store/actions/productAction";
import { useEffect } from "react";
import { toast } from "sonner";
import AddProductModal from "../../component/modal/AddProductModal";
import EditProductModal from "../../component/modal/EditProductModal";

const Product = () => {
  const token = useSelector((state) => state.auth.authData) // Validasi token
  const dispatch = useDispatch()
  const prod = useSelector((state) => state.product.products) // Validasi Produk

  const getProduct = async () => {
    // Authentication
    try {
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const response = await axiosInstance.get('/products', {headers})

      if (response.status === 200) {
        dispatch(setProducts(response.data.data))
        console.log(response)
      }
    } catch (error) {
      console.error(error.message)
    }
  }


  // Fungsi menghapus product
  const deleteProduct = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const result = await axiosInstance.delete(`/products/${id}`, {headers})

      if (result.status === 204) {
        toast.success("Barang berhasil dihapus!")
        getProduct()
      }
    } catch (error) {
      toast.error("Deleted Failed")
      console.error(error.message)
    }
  }


  useEffect(() => {
    getProduct()
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
              <h2 className="text-xl font-bold">PRODUCT</h2>
              <AddProductModal />
            </div>
            <div>
              <Table aria-label="Customer">
                <TableHeader className="flex items-center justify-center">
                  <TableColumn>No</TableColumn>
                  <TableColumn>Nama Barang</TableColumn>
                  <TableColumn>Harga</TableColumn>
                  <TableColumn>Type</TableColumn>
                  <TableColumn className="flex items-center justify-center">
                    Action
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {prod.map((prod, index) => {
                    return (
                      <TableRow key={prod.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{prod.name}</TableCell>
                        <TableCell>{prod.price}</TableCell>
                        <TableCell>{prod.type}</TableCell>
                        <TableCell className="flex justify-center gap-4">
                          <EditProductModal />
                          <Button onClick={() => deleteProduct(prod.id)}>Hapus</Button>
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

export default Product;
