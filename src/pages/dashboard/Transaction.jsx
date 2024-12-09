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
import { useEffect } from "react";
import { setTransactions } from "../../store/actions/transactionAction";
import DetailTransactionModal from "../../component/modal/DetailTransaction";
  
  const Transaction = () => {
    const token = useSelector((state) => state.auth.authData) // Akses token
    const dispatch = useDispatch() // kirim aksi ke redux store
    const trans = useSelector((state => state.transaction.transactions))

    const getTransactions = async () => {
      //Authentication
      try {
        const headers = {
          Authorization: `Bearer ${token}`
        }
        const response = await axiosInstance.get('/bills', {headers})

        if (response.status === 200) {
          dispatch(setTransactions(response.data.data))
          console.log(response)
        }
      } catch (error) {
        console.error(error.message)
      }
    }


    useEffect(() => {
      getTransactions()
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
                <h2 className="text-xl font-bold">TRANSAKSI</h2>
                <Button>TAMBAH TRANSAKSI</Button>
              </div>
              <div>
                <Table aria-label="Customer">
                  <TableHeader className="flex items-center justify-center">
                    <TableColumn>No id</TableColumn>
                    <TableColumn>Nama Customer</TableColumn>
                    <TableColumn className="flex items-center justify-center">
                      Action
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {Object.values(trans).map((trans) => {
                      return (
                        <TableRow key="1">
                          <TableCell>{trans.customer.id}</TableCell>
                          <TableCell>{trans.customer.name}</TableCell>
                          <TableCell className="flex justify-center gap-4">
                            <DetailTransactionModal />
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
  
  export default Transaction;
  