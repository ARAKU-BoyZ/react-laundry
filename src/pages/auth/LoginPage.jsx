import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { axiosInstance } from '../../lib/axios'
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/actions/authAction"
import { toast } from "sonner"


const loginSchema = z.object({
    username: z.string().min(5, "Username minimal 5 karakter"),
    password: z.string().regex(/[a-z]/, "Password harus menggunakan huruf kecil"),
})


const LoginPage = () => {
    const token = useSelector((state) => state.auth.authData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(loginSchema)
    })

    const loginUser = async (data) => {
        try {
            const response = await axiosInstance.post('/auth/login', data)
            const token = response.data.data.token
            const combined = token
            toast.success("Berhasil Masuk!")

            if (response.status === 201) {
                dispatch(login(combined))
                setTimeout(() => {
                    navigate('/dashboard-customer')
                }, 1000)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="w-[300px]">
                <CardHeader className="font-semibold text-lg justify-center">Log in!</CardHeader>
                <Divider />
                <CardBody>
                    <form onSubmit={form.handleSubmit(loginUser)} className="flex flex-col gap-4">
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
                            Log in
                         </Button>
                    </form>
                </CardBody>
                <CardFooter className="flex justify-center">
                    <p>Belum punya akun?
                        <Link to="/sign-up" className="text-blue-700 hover:text-blue-400"> Daftar</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage