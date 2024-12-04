import { Button, Modal, ModalBody, ModalHeader, Table, TableColumn, TableHeader, useDisclosure } from "@nextui-org/react"

const DetailTransactionModal = (selectedCustomer) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    return (
        <>
            <Button onPress={onOpen}>Detail Transaksi</Button>
            <Modal isOpen={isOpen}  onOpenChange={onOpenChange}>
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <>
                        {selectedCustomer && (
                            <Table>
                                <TableHeader>
                                    <TableColumn>No</TableColumn>
                                    <TableColumn>Adek</TableColumn>
                                    <TableColumn>Jhon</TableColumn>
                                    <TableColumn>Serang</TableColumn>
                                </TableHeader>
                            </Table>
                        )}
                    </>
                </ModalBody>
            </Modal>
        </>
    )
}

export default DetailTransactionModal