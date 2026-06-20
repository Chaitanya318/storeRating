import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StoreCard from "../../components/user/StoreCard";
import RatingModal from "../../components/user/RatingModal";


const Stores = () => {

    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);


    const [filters, setFilters] = useState({
        name: "",
        address: ""
    });


    const [selectedStore, setSelectedStore] = useState(null);


    useEffect(() => {
        fetchStores();
    }, [filters]);


    const fetchStores = async () => {

        try {

            setLoading(true);


            const response = await api.get(
                "/user/stores",
                {
                    params: filters
                }
            );


            setStores(response.data.data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load stores"
            );

        } finally {

            setLoading(false);
        }

    };


    const handleFilterChange = (e) => {

        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });

    };


    const handleRatingSubmit = async (rating) => {

        try {

            if (selectedStore.submittedRating) {

                // Update existing rating
                await api.put(
                    `/user/ratings/${selectedStore.ratingId}`,
                    {
                        rating
                    }
                );


                toast.success(
                    "Rating updated successfully"
                );

            } else {

                // Create new rating
                await api.post(
                    "/user/ratings",
                    {
                        storeId: selectedStore.id,
                        rating
                    }
                );


                toast.success(
                    "Rating submitted successfully"
                );

            }


            setSelectedStore(null);

            fetchStores();


        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };


    return (

        <DashboardLayout>


            {/* Header */}

            <div className="mb-6">

                <h1 className="text-3xl font-bold">
                    Discover Stores
                </h1>


                <p className="text-gray-500 mt-1">
                    Rate your favorite stores
                </p>

            </div>



            {/* Search */}

            <div className="
                bg-white
                rounded-xl
                shadow
                p-4
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
                mb-6
            ">

                <input
                    type="text"
                    name="name"
                    placeholder="Search by store name"
                    className="
                        border
                        rounded-lg
                        p-3
                    "
                    onChange={handleFilterChange}
                />


                <input
                    type="text"
                    name="address"
                    placeholder="Search by address"
                    className="
                        border
                        rounded-lg
                        p-3
                    "
                    onChange={handleFilterChange}
                />

            </div>



            {/* Store Grid */}

            {
                loading ? (

                    <div className="
                        bg-white
                        p-6
                        rounded-xl
                        shadow
                    ">
                        Loading stores...
                    </div>

                ) : stores.length === 0 ? (

                    <div className="
                        bg-white
                        p-6
                        rounded-xl
                        shadow
                        text-center
                    ">
                        No stores found
                    </div>

                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-6
                    ">

                        {
                            stores.map((store) => (

                                <StoreCard
                                    key={store.id}
                                    store={store}
                                    onRate={setSelectedStore}
                                />

                            ))
                        }

                    </div>

                )
            }


            {/* Rating Modal */}

            {
                selectedStore && (

                    <RatingModal
                        store={selectedStore}
                        closeModal={() =>
                            setSelectedStore(null)
                        }
                        submitRating={handleRatingSubmit}
                    />

                )
            }


        </DashboardLayout>

    );

};


export default Stores;