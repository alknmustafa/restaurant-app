import PortionIcon from "../../public/icons/PortionIcon";
import CutleryIcon from "../../public/icons/CutleryIcon";

export default function MenuCardComponent({
    meal,
    imageUrl,
    dishName,
    portion,
    persons,
    description,
    price,
    restaurantId,
    onOrder,
}) {
    return (
        <div className="border rounded-2xl overflow-hidden">

            {/* IMAGE */}
            <div>
                <img
                    src={imageUrl}
                    alt={dishName}
                    className="w-full h-40 object-cover"
                />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col mt-2 px-3 pb-4">

                {/* DISH NAME */}
                <h1 className="text-lg font-normal">
                    {dishName}
                </h1>

                {/* PORTION / PERSONS */}
                <div className="flex flex-col gap-1 mt-3 text-sm text-gray-500">

                    <div className="flex items-center gap-2">
                        <PortionIcon size={14} />
                        <span>{portion} Portion</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <CutleryIcon size={14} />
                        <span>{persons} people</span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-gray-400 mt-1">
                        {description}
                    </p>

                </div>

                {/* PRICE + ORDER */}
                <div className="flex justify-between items-center mt-4">

                    <h3 className="text-xl font-bold">
                        {price}€
                    </h3>

                    <button
                        onClick={() =>
                            onOrder({
                                _id: meal._id,
                                restaurantId: restaurantId,
                                imageUrl,
                                dishName,
                                price: Number(price),
                            })
                        }
                        className="px-5 py-2 bg-red-500 text-white rounded-full text-base font-medium hover:bg-red-600 transition"
                    >
                        Order Now
                    </button>

                </div>

            </div>

        </div>
    );
}