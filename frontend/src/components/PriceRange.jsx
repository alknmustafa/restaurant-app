export default function PriceRange({
    averagePrice = 20,
    currency = "€",
}) {

    const getPriceLevel = (price) => {
        if (price < 15) return 1;
        if (price < 35) return 2;
        return 3;
    };

    const level = getPriceLevel(averagePrice);

    return (
        <div className="flex flex-col items-end">

            <div className="flex items-center gap-1">
                {[1, 2, 3].map((item) => (
                    <span
                        key={item}
                        className={`font-bold text-xl ${
                            item <= level
                                ? "text-red-500"
                                : "text-gray-300"
                        }`}
                    >
                        {currency}
                    </span>
                ))}
            </div>

            <p className="text-xs text-gray-400 mt-1">
                Price Range
            </p>

        </div>
    );
}