import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../../services/api";


const AddStoreModal = ({ closeModal, refreshStores }) => {

    const [loading, setLoading] = useState(false);
    const [owners, setOwners] = useState([]);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        ownerId: ""
    });


    useEffect(() => {
        fetchOwners();
    }, []);


    const fetchOwners = async () => {

        try {

            const response = await api.get(
                "/admin/users",
                {
                    params: {
                        role: "OWNER"
                    }
                }
            );


            setOwners(response.data.data);

        } catch (error) {

            toast.error(
                "Failed to load owners"
            );
        }

    };


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const validateForm = () => {

        const {
            name,
            email,
            address,
            ownerId
        } = formData;


        if (
            !name ||
            !email ||
            !address ||
            !ownerId
        ) {

            toast.error(
                "All fields are required"
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
                "/admin/stores",
                formData
            );


            toast.success(
                "Store created successfully"
            );


            refreshStores();

            closeModal();


        } catch (error) {


            toast.error(
                error.response?.data?.message ||
                "Failed to create store"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="
            fixed inset-0
            z-50
            bg-black/50
            flex justify-center items-center
            p-4
        ">


            <div className="
                bg-white
                rounded-2xl
                shadow-xl
                w-full
                max-w-lg
                p-6
                relative
            ">


                <button
                    onClick={closeModal}
                    className="
                        absolute
                        top-5
                        right-5
                        text-gray-500
                    "
                >

                    <FaTimes />

                </button>


                <h2 className="text-2xl font-bold mb-6">
                    Add New Store
                </h2>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >


                    <input
                        name="name"
                        placeholder="Store Name"
                        className="
                            w-full
                            border
                            p-3
                            rounded-lg
                        "
                        onChange={handleChange}
                    />


                    <input
                        type="email"
                        name="email"
                        placeholder="Store Email"
                        className="
                            w-full
                            border
                            p-3
                            rounded-lg
                        "
                        onChange={handleChange}
                    />


                    <textarea
                        name="address"
                        rows="3"
                        placeholder="Store Address"
                        className="
                            w-full
                            border
                            p-3
                            rounded-lg
                            resize-none
                        "
                        onChange={handleChange}
                    />


                    <select
                        name="ownerId"
                        className="
                            w-full
                            border
                            p-3
                            rounded-lg
                        "
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Store Owner
                        </option>


                        {
                            owners.map(owner => (

                                <option
                                    key={owner._id}
                                    value={owner._id}
                                >

                                    {owner.name}

                                </option>

                            ))
                        }

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
                            ? "Creating Store..."
                            : "Create Store"
                        }

                    </button>


                </form>

            </div>

        </div>

    );

};


export default AddStoreModal;