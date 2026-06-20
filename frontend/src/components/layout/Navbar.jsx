import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Navbar = ({ setIsOpen }) => {

    const { user, logout } = useAuth();

    const navigate = useNavigate();


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (
        <header
            className="
                bg-white
                shadow-sm
                px-6 py-4
                flex justify-between items-center
            "
        >

            <button
                className="lg:hidden text-xl"
                onClick={() => setIsOpen(true)}
            >

                <FaBars />

            </button>


            <div>

                <h2 className="font-semibold text-lg">
                    Welcome,
                    {" "}
                    {user?.name?.split(" ")[0]}
                </h2>

                <p className="text-gray-500 text-sm">
                    {user?.role}
                </p>

            </div>


            <button
                onClick={handleLogout}
                className="
                    flex items-center gap-2
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4 py-2
                    rounded-lg
                    transition
                "
            >

                <FaSignOutAlt />

                Logout

            </button>

        </header>
    );

};


export default Navbar;