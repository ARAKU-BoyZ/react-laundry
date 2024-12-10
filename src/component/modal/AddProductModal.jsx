import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { z } from "zod"
import { axiosInstance } from "../../lib/axios"
import { toast } from "sonner"
import { addProduct } from "../../store/actions/productAction"




const AddProductSchema = z.object ({
    name: z.string().min(3, "Minimal 3 karakter"),
    price: z.string().regex(/^[0-9]+(\.[0-9]+)$/, "Masukan hanya berupa number"),
    type: z.string().max(6, "Max hanya 6 karakter"),
})


const AddProductModal = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const token = useSelector((state) => state.auth.authData)
    const dispatch = useDispatch()

    const form = useForm({
        defaultValues: {
            name: "",
            price: "",
            type: ""
        },
        resolver: zodResolver(AddProductSchema)
    })

    const addProductModal = async (data) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const response = await axiosInstance.post('/products', data, {headers})

            if (response.status === 201) {
                toast.success("Product berhasil ditambahkan")
                dispatch(addProduct(response.data.data))
                console.log(response)
            }
        } catch (error) {
            console.error("error message")
            toast.error("Mohon maaf untuk saat ini product belum bisa di tambahkan!")
        }
    }

    return (
        <>
            <Button onPress={onOpen}>Tambah Product</Button>
            <Modal isOpen={isOpen}  onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Tambah Product</ModalHeader>
                            <ModalBody>
                                <form onSubmit={form.handleSubmit(addProductModal)} className="flex flex-col gap-4">
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
export default AddProductModal