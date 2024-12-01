import { zodResolver } from "@hookform/resolvers/zod"
import { axiosInstance} from '../../lib/axios'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { login } from "../../store/actions/authAction"



const SignupSchema = z.object({
    name: z.string().min(5, "Nama minimal 5 karakter"),
    email: z.string().email("Email tidak valid!"),
    username: z.string().min(5, "Username minimal 5 karakter"),
    password: z.string().regex(/[a-z]/, "Password harus menggunakan huruf kecil"),
})

const SignupPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
        },
        resolver: zodResolver(SignupSchema)
    })

    const registerUser = async (data) => {
        try {
            const userData = {...data, role: "employee"}
            const response = await axiosInstance.post('/auth/register', userData)
            toast.success("Pendaftaran Berhasil")

            if (response.status === 201) {
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }
        } catch (error) {
            toast.error("Pendaftaran gagal")
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="w-[300px]">
                <CardHeader className="font-semibold text-lg justify-center">Sign up!</CardHeader>
                <Divider />
                <CardBody>
                    <form onSubmit={form.handleSubmit(registerUser)} className="flex flex-col gap-4">
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
                        name="email"
                        control={form.control}
                        render={({field,fieldState}) => {
                            return (
                                <Input
                                {...field}
                                label="Email"
                                size="sm"
                                type="email"
                                isInvalid={Boolean(fieldState.error)}
                                errorMessage={fieldState.error?.message} />
                            )
                        }} />
                        <Controller
                        name="username"
                        control={form.control}
                        render={({field, fieldState}) => {
                            return (
                                <Input
                                {...field}
                                label="Username"
                                size="sm"
                                isInvalid={Boolean(fieldState.error)}
                                errorMessage={fieldState.error?.message} />
                            )
                        }} />
                        <Controller
                        name="password"
                        control={form.control}
                        render={({field, fieldState}) => {
                            return (
                                <Input
                                {...field}
                                label="Password"
                                size="sm"
                                type="password"
                                isInvalid={Boolean(fieldState.error)}
                                errorMessage={fieldState.error?.message} />
                            )
                        }} />
                        <Button type="submit" color="primary">
                            Sign Up
                        </Button>
                    </form>
                </CardBody>
                <CardFooter className="flex justify-center">
                    <p>Sudah punya akun?
                        <Link
                         to='/'
                         className="text-blue-700 hover:text-blue-300"> Masuk</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignupPage