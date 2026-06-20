import { Link, useLocation } from "react-router-dom";
import {
    FaHome,
    FaUsers,
    FaStore,
    FaStar,
    FaLock
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";


const Sidebar = ({ isOpen, setIsOpen }) => {

    const { user } = useAuth();
    const location = useLocation();


    const menus = {

        ADMIN: [
            {
                name: "Dashboard",
                path: "/admin",
                icon: <FaHome />
            },
            {
                name: "Users",
                path: "/admin/users",
                icon: <FaUsers />
            },
            {
                name: "Stores",
                path: "/admin/stores",
                icon: <FaStore />
            }
        ],


        USER: [
            {
                name: "Stores",
                path: "/user/stores",
                icon: <FaStore />
            },
            {
                name: "Change Password",
                path: "/user/password",
                icon: <FaLock />
            }
        ],


        OWNER: [
            {
                name: "Dashboard",
                path: "/owner",
                icon: <FaStar />
            },
            {
                name: "Change Password",
                path: "/owner/password",
                icon: <FaLock />
            }
        ]
    };


    const links = menus[user?.role] || [];


    return (
        <>
            {/* Mobile Overlay */}
            {
                isOpen &&
                <div
                    onClick={() => setIsOpen(false)}
                    className="
                        fixed inset-0 bg-black/50
                        z-30 lg:hidden
                    "
                />
            }


            <aside
                className={`
                    fixed lg:static
                    z-40
                    w-64
                    h-screen
                    bg-slate-900
                    text-white
                    transform
                    transition-transform
                    duration-300
                    
                    ${
                        isOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >

                <div className="p-6">

                    <h1 className="text-2xl font-bold">
                        Store Rating
                    </h1>

                </div>


                <nav className="px-4">

                    {
                        links.map((item) => (

                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    flex items-center gap-3
                                    px-4 py-3
                                    rounded-lg mb-2
                                    transition
                                    
                                    ${
                                        location.pathname === item.path
                                        ? "bg-indigo-600"
                                        : "hover:bg-slate-800"
                                    }
                                `}
                            >

                                {item.icon}

                                {item.name}

                            </Link>

                        ))
                    }

                </nav>

            </aside>

        </>
    );

};


export default Sidebar;