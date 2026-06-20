const StoreRow = ({ store }) => {

    return (
        <tr className="border-t">

            <td className="p-4">
                {store.name}
            </td>


            <td className="p-4">
                {store.email}
            </td>


            <td className="p-4 max-w-xs truncate">
                {store.address}
            </td>


            <td className="p-4">
                {store.owner.name}
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

                    ⭐ {store.averageRating}

                </span>

            </td>

        </tr>
    );

};


export default StoreRow;