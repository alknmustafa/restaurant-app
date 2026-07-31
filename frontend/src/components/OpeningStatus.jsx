export default function OpeningStatus({
    isOpen = true,
    closingTime = "23:00",
}) {

    return (
        <div>
            <div className={`flex items-center gap-2 font-semibold text-sm ${isOpen ? "text-green-500" : "text-red-500"
                }`}
            >
                <span className={`w-3.5 h-3.5 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`}></span>

                {isOpen ? "Open Now" : "Closed Now"}

            </div>

            {isOpen && (
                <p className="text-gray-500 text-sm mt-1">Closes at {closingTime}</p>

            )}

        </div>
    )
}