import { useEffect, useState } from "react";
import {
    FaStore,
    FaStar,
    FaUsers
} from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";


const Dashboard = () => {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchDashboard();
    }, []);


    const fetchDashboard = async () => {

        try {

            const response = await api.get(
                "/owner/dashboard"
            );


            setDashboard(response.data.data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);

        }

    };


    if (loading) {
        return (
            <DashboardLayout>

                <div className="
                    bg-white
                    p-6
                    rounded-xl
                    shadow
                ">

                    Loading dashboard...

                </div>

            </DashboardLayout>
        );
    }


    return (

        <DashboardLayout>


            {/* Header */}

            <div className="mb-6">

                <h1 className="
                    text-3xl
                    font-bold
                ">
                    Store Owner Dashboard
                </h1>


                <p className="text-gray-500 mt-2">
                    Manage your store performance
                </p>

            </div>


            {/* Statistics Cards */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                mb-8
            ">


                {/* Store Card */}

                <div className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <FaStore className="
                            text-indigo-600
                            text-3xl
                        "/>


                        <div>

                            <h2 className="font-bold text-lg">
                                {dashboard.store.name}
                            </h2>


                            <p className="text-gray-500 text-sm">
                                {dashboard.store.address}
                            </p>

                        </div>

                    </div>

                </div>



                {/* Average Rating */}

                <div className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <p className="text-gray-500">
                            Average Rating
                        </p>


                        <h2 className="
                            text-3xl
                            font-bold
                        ">

                            {dashboard.store.averageRating}/5

                        </h2>

                    </div>


                    <FaStar className="
                        text-yellow-400
                        text-4xl
                    "/>

                </div>



                {/* Total Users */}

                <div className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <p className="text-gray-500">
                            Total Ratings
                        </p>


                        <h2 className="
                            text-3xl
                            font-bold
                        ">

                            {dashboard.totalRatings}

                        </h2>

                    </div>


                    <FaUsers className="
                        text-green-600
                        text-4xl
                    "/>

                </div>


            </div>



            {/* Ratings Table */}

            <div className="
                bg-white
                rounded-xl
                shadow
                overflow-x-auto
            ">


                <div className="
                    p-5
                    border-b
                ">

                    <h2 className="
                        text-xl
                        font-bold
                    ">
                        Users Who Rated Your Store
                    </h2>

                </div>


                {
                    dashboard.ratedUsers.length === 0 ? (

                        <div className="
                            p-8
                            text-center
                            text-gray-500
                        ">

                            No ratings yet

                        </div>

                    ) : (

                        <table className="w-full">


                            <thead className="bg-gray-100">

                                <tr>

                                    <th className="text-left p-4">
                                        Name
                                    </th>


                                    <th className="text-left p-4">
                                        Email
                                    </th>


                                    <th className="text-left p-4">
                                        Rating
                                    </th>

                                </tr>

                            </thead>


                            <tbody>


                                {
                                    dashboard.ratedUsers.map((user) => (

                                        <tr
                                            key={user.userId}
                                            className="border-t"
                                        >

                                            <td className="p-4">
                                                {user.name}
                                            </td>


                                            <td className="p-4">
                                                {user.email}
                                            </td>


                                            <td className="p-4">

                                                <span className="
                                                    bg-yellow-100
                                                    text-yellow-700
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    font-medium
                                                ">

                                                    ⭐ {user.rating}

                                                </span>

                                            </td>

                                        </tr>

                                    ))
                                }


                            </tbody>


                        </table>

                    )
                }


            </div>


        </DashboardLayout>

    );

};


export default Dashboard;