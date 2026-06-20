const UserRow = ({
    user
}) => {

    return (

        <tr className="border-t">

            <td className="p-4">
                {user.name}
            </td>


            <td className="p-4">
                {user.email}
            </td>


            <td className="p-4 max-w-xs truncate">
                {user.address}
            </td>


            <td className="p-4">

                <span
                    className="
                        bg-indigo-100
                        text-indigo-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                    "
                >

                    {user.role}

                </span>

            </td>

        </tr>

    );

};


export default UserRow;