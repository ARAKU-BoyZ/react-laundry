import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { axiosInstance } from "../../lib/axios"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { updateCustomer } from "../../store/actions/customerAction"


const editCustSchema = z.object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    phoneNumber: z.string().regex(/[0-9]/, "Nomer handphoen harus berupa angka"),
    address: z.string().min(8, "Alamat minimal 8 karakter")
})

const EditCustomerModal = () => {
    //Set Data ke redux
    const dispatch = useDispatch()
    //Validasi Token
    const token = useSelector((state) => state.auth.authData)
    // Fungsi open close modal
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    // Validasi Input menggunakan use form
    const form = useForm({
        defaultValues: {
            name: "",
            phoneNumber: "",
            address: "",
        },
        resolver: zodResolver(editCustSchema)
    })


    //Fungsi Edit Customer
    const editCustomer = async (data) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const response = await axiosInstance.put("/customers", data, {headers})

            if (response.status === 200) {
                dispatch(updateCustomer(data))
                toast.success("Data berhasil di update!")
                console.log(response)
            }
        } catch (error) {
            toast.error("edit gagal")
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
                            <ModalHeader>Edit Customer</ModalHeader>
                            <ModalBody>
                                <form onSubmit={form.handleSubmit(editCustomer)} className="flex flex-col gap-4">
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

export default EditCustomerModal