import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


const DashboardLayout = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);


    return (

        <div className="flex min-h-screen bg-gray-100">


            <Sidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />


            <div className="flex-1">

                <Navbar
                    setIsOpen={setIsOpen}
                />


                <main className="p-6">

                    {children}

                </main>


            </div>


        </div>

    );

};


export default DashboardLayout;