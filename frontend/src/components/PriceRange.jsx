export default function PriceRange({
  priceLevel = 2,
  currency = "€",
}) {
  return (
    <div className="flex flex-col items-end">

      <div className="flex items-center gap-1">
        {[1, 2, 3].map((item) => (
          <span
            key={item}
            className={`font-bold text-xl ${
              item <= priceLevel
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