import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
  TableHeader,
  useDisclosure,
} from "@nextui-org/react";
import { axiosInstance } from "../../lib/axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const DetailTransactionModal = () => {
    const token = useSelector((state) => state.auth.authData)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const trans = useSelector((state) => state.transaction.transactions)
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: "2-digit",
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const detailTransaction = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            }
            const response = await axiosInstance.get('/bills', {headers})
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        detailTransaction()
    }, [])
    return (
        <>
        <Button onPress={onOpen}>Detail Transaksi</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="flex w-full">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Detail Transaksi</ModalHeader>
                        <ModalBody>
                            <Table aria-label="Example static collection table">
                                <TableHeader>
                                    <TableColumn>No.</TableColumn>
                                    <TableColumn>Nama Pelanggan</TableColumn>
                                    <TableColumn>Paket Laundry</TableColumn>
                                    <TableColumn>Qty</TableColumn>
                                    <TableColumn>Harga</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {Object.values(trans).map((trans) => {
                                        return (
                                            <TableRow key={trans.id}>
                                                <TableCell>{trans.customer.id}</TableCell>
                                                <TableCell>{trans.customer.name}</TableCell>
                                                <TableCell>{trans.billDetails[0].product.name}</TableCell>
                                                <TableCell>{trans.billDetails[0].qty}</TableCell>
                                                <TableCell>{trans.billDetails[0].price}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    );
};

export default DetailTransactionModal;
