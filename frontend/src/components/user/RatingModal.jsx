import { useState } from "react";
import {
    FaStar,
    FaTimes
} from "react-icons/fa";


const RatingModal = ({
    store,
    closeModal,
    submitRating
}) => {

    const [rating, setRating] = useState(
        store.submittedRating || 1
    );


    return (

        <div className="
            fixed
            inset-0
            bg-black/50
            flex
            justify-center
            items-center
            z-50
            p-4
        ">

            <div className="
                bg-white
                rounded-2xl
                w-full
                max-w-md
                p-6
                relative
            ">


                <button
                    onClick={closeModal}
                    className="
                        absolute
                        right-5
                        top-5
                        text-gray-500
                    "
                >
                    <FaTimes />
                </button>


                <h2 className="
                    text-2xl
                    font-bold
                    mb-2
                ">
                    {store.name}
                </h2>


                <p className="
                    text-gray-500
                    mb-6
                ">
                    Select your rating
                </p>


                <div className="
                    flex
                    justify-center
                    gap-3
                    mb-8
                ">


                    {
                        [1,2,3,4,5].map((star)=>(
                            
                            <button
                                key={star}
                                onClick={() =>
                                    setRating(star)
                                }
                            >

                                <FaStar
                                    className={`
                                        text-4xl
                                        transition
                                        ${
                                            star <= rating
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                        }
                                    `}
                                />

                            </button>
                        ))
                    }


                </div>


                <button
                    onClick={() =>
                        submitRating(rating)
                    }
                    className="
                        w-full
                        bg-indigo-600
                        text-white
                        rounded-lg
                        p-3
                        hover:bg-indigo-700
                    "
                >

                    Submit Rating

                </button>


            </div>

        </div>

    );

};


export default RatingModal;