import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { z } from "zod"
import { axiosInstance } from "../../lib/axios"
import { updateProduct } from "../../store/actions/productAction"
import { toast } from "sonner"

const editProdSchema = z.object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    price: z.coerce.number(8, "hanya berupa angka"),
    type: z.string().max(6, "Alamat maksimal 6 karakter")
})

const EditProductModal = () => {
    const token = useSelector((state) => state.auth.authData)
    const dispatch = useDispatch()
    const {isOpen, onOpen, onOpenChange} = useDisclosure()


    const form = useForm({
        defaultValues: {
            name: "",
            price: "",
            type: "",
        },
        resolver: zodResolver(editProdSchema)
    })

    const editProduct = async (data) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const response = await axiosInstance.put('/products', data, {headers})

            if (response.status === 200) {
                dispatch(updateProduct(response.data.data))
                toast.success("Data berhasil di update")
                console.log(response)
            }
        } catch (error) {
            toast.error("Edit product gagal")
            console.error(error.message)
        }
    }

    return (
        <>
            <Button onPress={onOpen}>Edit</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Edit Product</ModalHeader>
                            <ModalBody>
                                <form onSubmit={form.handleSubmit(editProduct)} className="flex flex-col gap-4">
                                    <Controller
                                     name="name"
                                     control={form.control}
                                     render={({field, fieldState}) => {
                                        return (
                                            <Input
                                             {...field}
                                             label="Nama Barang"
                                             size="sm"
                                             isInvalid={Boolean(fieldState.error)}
                                             errorMessage={fieldState.error?.message} />
                                        )
                                     }} />
                                    <Controller
                                     name="price"
                                     control={form.control}
                                     render={({field, fieldState}) => {
                                        return (
                                            <Input
                                             {...field}
                                             label="Harga Barang"
                                             size="sm"
                                             isInvalid={Boolean(fieldState.error)}
                                             errorMessage={fieldState.error?.message} />
                                        )
                                     }} />
                                    <Controller
                                     name="type"
                                     control={form.control}
                                     render={({field, fieldState}) => {
                                        return (
                                            <Input
                                             {...field}
                                             label="Type Barang"
                                             size="sm"
                                             isInvalid={Boolean(fieldState.error)}
                                             errorMessage={fieldState.error?.message} />
                                        )
                                     }} />
                                     <Button type="submit" color="primary">Submit</Button>
                                     <Button onPress={onClose}>Cancel</Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditProductModal
