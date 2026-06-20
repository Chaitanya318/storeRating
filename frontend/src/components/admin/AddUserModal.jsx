import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

import api from "../../services/api";


const AddUserModal = ({ closeModal, refreshUsers }) => {

    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "USER"
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const validateForm = () => {

        const { name, email, address, password } = formData;


        if (!name || !email || !address || !password) {
            toast.error("All fields are required");
            return false;
        }


        if (name.length < 20 || name.length > 60) {
            toast.error("Name must be 20-60 characters");
            return false;
        }


        if (address.length > 400) {
            toast.error("Address max length is 400");
            return false;
        }


        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;


        if (!passwordRegex.test(password)) {

            toast.error(
                "Password must contain uppercase and special character"
            );

            return false;
        }


        return true;

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!validateForm()) return;


        try {

            setLoading(true);


            await api.post(
                "/admin/users",
                formData
            );


            toast.success(
                "User created successfully"
            );


            refreshUsers();

            closeModal();


        } catch (error) {


            toast.error(
                error.response?.data?.message ||
                "Failed to create user"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="
            fixed inset-0 z-50
            bg-black/40
            flex items-center justify-center
            p-4
        ">

            <div className="
                bg-white
                rounded-2xl
                shadow-xl
                w-full max-w-lg
                p-6
                relative
            ">


                <button
                    onClick={closeModal}
                    className="
                        absolute right-5 top-5
                        text-gray-500
                        hover:text-black
                    "
                >
                    <FaTimes />
                </button>


                <h2 className="
                    text-2xl font-bold mb-6
                ">
                    Add New User
                </h2>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >


                    <input
                        name="name"
                        placeholder="Full Name"
                        className="w-full border p-3 rounded-lg"
                        onChange={handleChange}
                    />


                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded-lg"
                        onChange={handleChange}
                    />


                    <textarea
                        name="address"
                        placeholder="Address"
                        rows="3"
                        className="w-full border p-3 rounded-lg resize-none"
                        onChange={handleChange}
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded-lg"
                        onChange={handleChange}
                    />


                    <select
                        name="role"
                        className="w-full border p-3 rounded-lg"
                        onChange={handleChange}
                    >

                        <option value="USER">
                            Normal User
                        </option>

                        <option value="OWNER">
                            Store Owner
                        </option>

                        <option value="ADMIN">
                            Admin
                        </option>

                    </select>


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
                            ? "Creating User..."
                            : "Create User"
                        }

                    </button>


                </form>


            </div>

        </div>

    );

};


export default AddUserModal;