import {
    useEffect,
    useState
} from "react";

import {
    FaUsers,
    FaStore,
    FaStar
} from "react-icons/fa";

import toast from "react-hot-toast";

import api from "../../services/api";

import DashboardLayout from "../../components/layout/DashboardLayout";

import StatCard from "../../components/ui/StatCard";

import CardLoader from "../../components/ui/CardLoader";


const Dashboard = () => {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStores: 0,
        totalRatings: 0
    });


    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchDashboard();

    }, []);



    const fetchDashboard = async () => {

        try {

            const response = await api.get(
                "/admin/dashboard"
            );


            setStats(response.data.data);


        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <DashboardLayout>

            <div className="mb-8">

                <h1 className="
                    text-3xl 
                    font-bold
                    text-gray-800
                ">
                    Admin Dashboard
                </h1>


                <p className="text-gray-500 mt-2">
                    Overview of your platform statistics
                </p>

            </div>



            <div className="
                grid 
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
            ">


                {
                    loading ? (

                        <>
                            <CardLoader />
                            <CardLoader />
                            <CardLoader />
                        </>

                    ) : (

                        <>
                            <StatCard
                                title="Total Users"
                                value={stats.totalUsers}
                                icon={<FaUsers />}
                                color="bg-blue-500"
                            />


                            <StatCard
                                title="Total Stores"
                                value={stats.totalStores}
                                icon={<FaStore />}
                                color="bg-indigo-500"
                            />


                            <StatCard
                                title="Total Ratings"
                                value={stats.totalRatings}
                                icon={<FaStar />}
                                color="bg-yellow-500"
                            />

                        </>
                    )
                }


            </div>


        </DashboardLayout>

    );

};


export default Dashboard;