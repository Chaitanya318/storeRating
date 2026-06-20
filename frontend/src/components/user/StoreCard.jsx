import { FaStar } from "react-icons/fa";


const StoreCard = ({
    store,
    onRate
}) => {

    return (

        <div className="
            bg-white
            rounded-2xl
            shadow-sm
            hover:shadow-lg
            transition
            p-6
            flex
            flex-col
            gap-4
        ">


            {/* Store Name */}
            <div>

                <h2 className="
                    text-xl
                    font-bold
                    text-gray-800
                ">
                    {store.name}
                </h2>


                <p className="
                    text-gray-500
                    mt-1
                ">
                    {store.address}
                </p>

            </div>


            {/* Average Rating */}

            <div className="
                flex
                items-center
                gap-2
                text-yellow-500
            ">

                <FaStar />

                <span className="font-medium">

                    {store.overallRating || 0}/5

                </span>

            </div>


            {/* User Rating */}

            <div>

                <p className="text-gray-600">

                    Your Rating:
                    {" "}

                    <span className="font-semibold">

                        {
                            store.submittedRating
                            ? `${store.submittedRating}/5`
                            : "Not Rated"
                        }

                    </span>

                </p>

            </div>


            {/* Button */}

            <button
                onClick={() => onRate(store)}
                className="
                    mt-auto
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    rounded-lg
                    p-3
                    font-medium
                    transition
                "
            >

                {
                    store.submittedRating
                    ? "Update Rating"
                    : "Rate Store"
                }

            </button>


        </div>

    );

};


export default StoreCard;