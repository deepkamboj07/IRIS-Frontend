import { useForm } from "react-hook-form";
import { InputFieldWithValidation } from "../../../components/Inputs/InputWithValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../../libs/schemas/loginSchema";
import type z from "zod";
import { Form } from "../../../components/UI/Form";
import { Link, useNavigate} from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

const LoginPage = () => {

    const {login,loading} = useAuthStore();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
        const res = await login(data.email, data.password);
        if (res) {
            navigate('/profile'); // Redirect to home page after successful login
        }
    };

    return (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-6">
                        <span className="text-gray-500 text-sm">Please enter your credentials.</span>
                        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                    </div>

                    <div className="space-y-2">
                        <InputFieldWithValidation
                            name="email"
                            displayLabel="Email"
                            placeholder="Enter your email"
                            type="input"
                            control={form.control}
                        />
                        <InputFieldWithValidation
                            name="password"
                            displayLabel="Password"
                            placeholder="Enter your password"
                            type="input"
                            control={form.control}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="mt-4 flex justify-center items-center w-full">
                        <span className="text-sm text-gray-500">
                            Don't have an account? <Link to="/auth/register" className="text-blue-600 hover:underline">Sign Up</Link>
                        </span>
                    </div>
                    </form>
                </Form>
    );
};

export default LoginPage;
