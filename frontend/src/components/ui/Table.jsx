const Table = ({
    headers,
    children
}) => {

    return (

        <div className="
            bg-white
            rounded-xl
            shadow
            overflow-x-auto
        ">

            <table className="w-full">

                <thead
                    className="bg-gray-100"
                >
                    <tr>

                        {
                            headers.map((header) => (

                                <th
                                    key={header}
                                    className="
                                        text-left
                                        p-4
                                        font-semibold
                                    "
                                >
                                    {header}
                                </th>

                            ))
                        }

                    </tr>

                </thead>


                <tbody>

                    {children}

                </tbody>


            </table>

        </div>

    );
};


export default Table;