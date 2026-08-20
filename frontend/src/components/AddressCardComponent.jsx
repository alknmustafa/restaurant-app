import HomeIcon from "../../public/icons/HomeIcon";
import OtherHouseIcon from "../../public/icons/OtherHouseIcon";
import WorkIcon from "../../public/icons/WorkIcon";

export default function AddressCardComponent({
    address,
    onEdit,
    onDelete,
}) {
    const getAddressIcon = () => {
        if (address.label === "Work") {
            return <WorkIcon color="white" size={23} />;
        }

        if (address.label === "Other") {
            return <OtherHouseIcon color="white" size={23} />;
        }

        return <HomeIcon color="white" size={23} />;
    };

    return (
        <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            {/* TOP */}
            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500">
                        {getAddressIcon()}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            {address.label}
                        </h3>

                        {address.isDefault && (
                            <span className="mt-1 inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-500">
                                Default
                            </span>
                        )}
                    </div>

                </div>

            </div>

            {/* ADDRESS */}
            <div className="mt-6 leading-7 text-gray-600">

                <p>
                    {address.street} {address.houseNumber}
                </p>

                <p>
                    {address.postalCode} {address.city}
                </p>

                {address.additionalInfo && (
                    <p className="text-gray-400">
                        {address.additionalInfo}
                    </p>
                )}

            </div>

            {/* ACTIONS */}
            <div className="mt-5 flex gap-3 border-t border-gray-100 pt-5">

                <button
                    type="button"
                    onClick={() => onEdit(address)}
                    className="text-sm font-medium text-gray-600 transition hover:text-red-500"
                >
                    Edit
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(address._id)}
                    className="text-sm font-medium text-red-500 transition hover:text-red-600"
                >
                    Delete
                </button>

            </div>

        </div>
    );
}