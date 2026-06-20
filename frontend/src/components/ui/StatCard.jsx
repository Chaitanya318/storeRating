const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
            flex
            items-center
            justify-between
            hover:shadow-md
            transition
        ">
            <div>
                <h3 className="text-gray-500 text-sm">
                    {title}
                </h3>

                <p className="text-3xl font-bold mt-2">
                    {value}
                </p>
            </div>


            <div className={`
                ${color}
                text-white
                text-2xl
                p-4
                rounded-xl
            `}>
                {icon}
            </div>

        </div>
    );
};

export default StatCard;