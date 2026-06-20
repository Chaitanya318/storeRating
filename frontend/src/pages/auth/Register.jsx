import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../../services/api";


const Register = () => {

    const navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);


    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        password: ""
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const validateForm = () => {

        const { name, email, address, password } = formData;


        if (
            !name ||
            !email ||
            !address ||
            !password
        ) {
            toast.error("All fields are required");
            return false;
        }


        if (
            name.length < 20 ||
            name.length > 60
        ) {
            toast.error(
                "Name must be between 20 and 60 characters"
            );
            return false;
        }


        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(email)) {
            toast.error("Invalid email address");
            return false;
        }


        if (address.length > 400) {
            toast.error(
                "Address cannot exceed 400 characters"
            );
            return false;
        }


        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;


        if (!passwordRegex.test(password)) {

            toast.error(
                "Password needs 8-16 chars, uppercase & special character"
            );

            return false;
        }


        return true;
    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!validateForm()) {
            return;
        }


        try {

            setLoading(true);


            const response = await api.post(
                "/auth/register",
                formData
            );


            toast.success(
                response.data.message ||
                "Registration successful"
            );


            navigate("/login");


        } catch (error) {


            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen grid lg:grid-cols-2">


            {/* Left Section */}

            <div className="hidden lg:flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-700 text-white p-10">

                <div className="max-w-md">

                    <FaUserPlus className="text-6xl mb-6" />


                    <h1 className="text-5xl font-bold mb-4">

                        Join Our Platform

                    </h1>


                    <p className="text-lg text-indigo-100">

                        Create your account to discover stores,
                        submit ratings and share your experience.

                    </p>

                </div>

            </div>


            {/* Right Section */}

            <div className="flex items-center justify-center bg-gray-50 p-6">


                <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8">


                    <h2 className="text-3xl font-bold text-center mb-2">

                        Create Account

                    </h2>


                    <p className="text-gray-500 text-center mb-8">

                        Register as a normal user

                    </p>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* Name */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Full Name
                            </label>


                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>


                        {/* Email */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Email
                            </label>


                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>


                        {/* Address */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Address
                            </label>


                            <textarea
                                name="address"
                                rows="3"
                                placeholder="Enter your address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>


                        {/* Password */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Password
                            </label>


                            <div className="relative">


                                <input
                                    type={
                                        showPassword
                                        ? "text"
                                        : "password"
                                    }
                                    name="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-indigo-500"
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-4 text-gray-500"
                                >

                                    {
                                        showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                    }

                                </button>


                            </div>

                        </div>


                        {/* Submit Button */}

                        <button
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white rounded-lg p-3 font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                        >

                            {
                                loading
                                ? "Creating Account..."
                                : "Register"
                            }

                        </button>


                    </form>


                    <p className="text-center mt-6 text-gray-600">

                        Already have an account?

                        <Link
                            to="/login"
                            className="ml-1 text-indigo-600 font-semibold"
                        >

                            Login

                        </Link>

                    </p>


                </div>


            </div>


        </div>

    );

};


export default Register;