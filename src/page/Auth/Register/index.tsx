import { useForm } from "react-hook-form";
import { registerFormSchema } from "../../../libs/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { Form } from "../../../components/UI/Form";
import { InputFieldWithValidation } from "../../../components/Inputs/InputWithValidation";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

const Register = () => {
    const {register,loading} = useAuthStore();
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof registerFormSchema>>({
            resolver: zodResolver(registerFormSchema),
            defaultValues: {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
        });

        const onSubmit = async(data: z.infer<typeof registerFormSchema>) => {
            if (data.password !== data.confirmPassword) {
                form.setError("confirmPassword", {
                    type: "manual",
                    message: "Passwords do not match",
                });
                return;
            }
            const res = await register(data.email, data.username, data.password);
            if( res) {
                navigate("/auth/login");
            }
        }
    
        return (
                    <Form {...form}>
                        <form
                            onSubmit={
                                form.handleSubmit(onSubmit)
                            }
                            className=""
                            >
                        <div className="mb-6">
                            <span className="text-gray-500 text-sm">
                                Please fill in the details to create a new account.
                            </span>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Create an Account
                            </h2>
                        </div>
    
                        <div className="space-y-2">
                            <InputFieldWithValidation
                                name="username"
                                required
                                displayLabel="Username"
                                placeholder="Enter your username"
                                type="input"
                                control={form.control}
                            />
                            <InputFieldWithValidation
                                name="email"
                                required
                                displayLabel="Email"
                                placeholder="Enter your email"
                                type="input"
                                control={form.control}
                            />
                            <InputFieldWithValidation
                                name="password"
                                required
                                displayLabel="Password"
                                placeholder="Enter your password"
                                type="input"
                                control={form.control}
                            />
                            <InputFieldWithValidation
                                name="confirmPassword"
                                required
                                displayLabel="Confirm Password"
                                placeholder="Re-enter your password"
                                type="input"
                                control={form.control}
                            />
                        </div>
    
                        <button
                            type="submit"
                            className="mt-6 w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            {loading ? "Registering..." : "Sign Up"}
                        </button>
    
                        <div className="mt-4 flex justify-center items-center w-full">
                            <span className="text-sm text-gray-500">
                                Already have an account?
                                <Link to="/auth/login" className="text-blue-600 hover:underline">Log In</Link>
                            </span>
                        </div>
                        </form>
                    </Form>
        );
}
export default Register;