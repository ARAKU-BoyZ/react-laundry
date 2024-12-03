import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { z } from "zod"
import { axiosInstance } from "../../lib/axios"
import { addCustomer } from "../../store/actions/customerAction"
import { toast } from "sonner"


const AddCustomerSchema = z.object({
    name: z.string().min(3, "Minimal 3 karakter"),
    phoneNumber: z.string().regex(/[0-9]/, "Nomer handphone harus berupa angka"),
    address: z.string().min(8, "Alamat minimal 8 karakter")
})

const AddCustomerModal = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure() // Fungsi Button Modal
    const token = useSelector((state) => state.auth.authData) //Validasi Token
    const dispatch = useDispatch() // Set Data ke redux

    const form = useForm({
        defaultValues: {
            name: "",
            phoneNumber: "",
            address: "",
        },
        resolver: zodResolver(AddCustomerSchema)
    })

    const addCustomerModal = async (data) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            }
            const response = await axiosInstance.post("/customers", data, {headers})

            if (response.status === 201) {
                toast.success("Customer berhasil ditambahkan")
                dispatch(addCustomer(response.data.data))
                console.log(response)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            <Button onPress={onOpen}>Tambah Customer</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Tambah Customer</ModalHeader>
                            <ModalBody>
                                <form onSubmit={form.handleSubmit(addCustomerModal)}
                                className="flex flex-col gap-4">
                                    <Controller
                                    name="name"
                                    control={form.control}
                                    render={({field, fieldState}) => {
                                        return (
                                            <Input
                                            {...field}
                                            label="Nama"
                                            size="sm"
                                            isInvalid={Boolean(fieldState.error)}
                                            errorMessage={fieldState.error?.message} />
                                        )
                                    }} />
                                    <Controller
                                    name="phoneNumber"
                                    control={form.control}
                                    render={({field, fieldState}) => {
                                        return (
                                            <Input
                                            {...field}
                                            label="Nomer Handphone"
                                            size="sm"
                                            isInvalid={Boolean(fieldState.error)}
                                            errorMessage={fieldState.error?.message} />
                                        )
                                    }} />
                                    <Controller
                                    name="address"
                                    control={form.control}
                                    render={({field, fieldState}) => {
                                        return (
                                            <Input
                                            {...field}
                                            label="Alamat"
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

export default AddCustomerModal