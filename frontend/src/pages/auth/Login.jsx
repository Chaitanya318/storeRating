import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaStore } from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";


const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!formData.email || !formData.password) {
            return toast.error("All fields are required");
        }


        try {

            setLoading(true);


            const response = await api.post(
                "/auth/login",
                formData
            );


            const {
                token,
                user
            } = response.data;


            login(token, user);


            toast.success("Login successful");


            // Role based redirect
            if (user.role === "ADMIN") {
                navigate("/admin");
            }

            else if (user.role === "USER") {
                navigate("/user/stores");
            }

            else {
                navigate("/owner");
            }


        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen grid lg:grid-cols-2">

            {/* Left Side */}
            <div className="hidden lg:flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-700 text-white p-10">

                <div className="max-w-md">

                    <FaStore className="text-6xl mb-6" />

                    <h1 className="text-5xl font-bold mb-4">
                        Store Rating Platform
                    </h1>

                    <p className="text-lg text-indigo-100">
                        Manage stores, submit ratings,
                        and track customer feedback
                        with a powerful dashboard.
                    </p>

                </div>

            </div>


            {/* Right Side */}
            <div className="flex items-center justify-center p-6 bg-gray-50">

                <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">


                    <h2 className="text-3xl font-bold text-center mb-2">
                        Welcome Back
                    </h2>


                    <p className="text-gray-500 text-center mb-8">
                        Login to your account
                    </p>


                    <form onSubmit={handleSubmit} className="space-y-5">


                        {/* Email */}
                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Email
                            </label>


                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>


                        {/* Password */}
                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Password
                            </label>


                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter password"
                                    className="w-full border rounded-lg p-3 pr-12 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.password}
                                    onChange={handleChange}
                                />


                                <button
                                    type="button"
                                    className="absolute right-4 top-4 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >

                                    {
                                        showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }

                                </button>

                            </div>

                        </div>


                        {/* Button */}
                        <button
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold transition disabled:opacity-60"
                        >

                            {
                                loading
                                    ? "Logging in..."
                                    : "Login"
                            }

                        </button>


                    </form>


                    <p className="text-center mt-6 text-gray-600">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="text-indigo-600 ml-1 font-semibold"
                        >
                            Register
                        </Link>

                    </p>


                </div>

            </div>

        </div>

    );

};


export default Login;