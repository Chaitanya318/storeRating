import { useState } from "react";
import {
    FaEye,
    FaEyeSlash,
    FaLock
} from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";


const ChangePassword = () => {

    const [loading, setLoading] = useState(false);


    const [show, setShow] = useState({
        oldPassword: false,
        newPassword: false
    });


    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: ""
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const togglePassword = (field) => {

        setShow({
            ...show,
            [field]: !show[field]
        });

    };


    const validatePassword = () => {

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;


        if (!passwordRegex.test(formData.newPassword)) {

            toast.error(
                "Password must be 8-16 characters with uppercase and special character"
            );

            return false;
        }


        return true;

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!validatePassword()) return;


        try {

            setLoading(true);


            const response = await api.put(
                "/user/change-password",
                formData
            );


            toast.success(
                response.data.message
            );


            setFormData({
                oldPassword: "",
                newPassword: ""
            });


        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to change password"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <DashboardLayout>

            <div className="
                max-w-xl
                mx-auto
                bg-white
                rounded-2xl
                shadow-md
                p-8
                mt-8
            ">

                <div className="text-center mb-8">

                    <div className="
                        w-16 h-16
                        bg-indigo-100
                        rounded-full
                        flex items-center justify-center
                        mx-auto mb-4
                    ">

                        <FaLock className="
                            text-2xl text-indigo-600
                        "/>

                    </div>


                    <h1 className="
                        text-3xl font-bold
                    ">
                        Change Password
                    </h1>


                    <p className="
                        text-gray-500 mt-2
                    ">
                        Update your account security
                    </p>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Old Password */}
                    <div>

                        <label className="block mb-2 font-medium">
                            Current Password
                        </label>


                        <div className="relative">

                            <input
                                type={
                                    show.oldPassword
                                    ? "text"
                                    : "password"
                                }
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    rounded-lg
                                    p-3
                                    pr-12
                                    outline-none
                                    focus:ring-2
                                    focus:ring-indigo-500
                                "
                                placeholder="Enter current password"
                            />


                            <button
                                type="button"
                                onClick={() =>
                                    togglePassword("oldPassword")
                                }
                                className="
                                    absolute
                                    right-4
                                    top-4
                                    text-gray-500
                                "
                            >

                                {
                                    show.oldPassword
                                    ? <FaEyeSlash/>
                                    : <FaEye/>
                                }

                            </button>

                        </div>

                    </div>


                    {/* New Password */}
                    <div>

                        <label className="block mb-2 font-medium">
                            New Password
                        </label>


                        <div className="relative">

                            <input
                                type={
                                    show.newPassword
                                    ? "text"
                                    : "password"
                                }
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    rounded-lg
                                    p-3
                                    pr-12
                                    outline-none
                                    focus:ring-2
                                    focus:ring-indigo-500
                                "
                                placeholder="Enter new password"
                            />


                            <button
                                type="button"
                                onClick={() =>
                                    togglePassword("newPassword")
                                }
                                className="
                                    absolute
                                    right-4
                                    top-4
                                    text-gray-500
                                "
                            >

                                {
                                    show.newPassword
                                    ? <FaEyeSlash/>
                                    : <FaEye/>
                                }

                            </button>

                        </div>

                    </div>


                    <button
                        disabled={loading}
                        className="
                            w-full
                            bg-indigo-600
                            text-white
                            p-3
                            rounded-lg
                            hover:bg-indigo-700
                            disabled:opacity-50
                        "
                    >

                        {
                            loading
                            ? "Updating Password..."
                            : "Update Password"
                        }

                    </button>


                </form>

            </div>

        </DashboardLayout>

    );

};


export default ChangePassword;