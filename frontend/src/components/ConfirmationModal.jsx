import ButtonComponent from "./ButtonComponent";
import TrashIcon from "../../public/icons/TrashIcon";

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ICON */}
                <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                        <TrashIcon
                            size={26}
                            color="#ef4444"
                        />
                    </div>
                </div>

                {/* CONTENT */}
                <div className="mt-5 text-center">
                    <h2 className="text-xl font-bold text-gray-800">
                        {title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {message}
                    </p>
                </div>

                {/* ACTIONS */}
                <div className="mt-7 flex rounded-full gap-3">
                    <ButtonComponent
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 px-5 py-2"
                    >
                        {cancelText}
                    </ButtonComponent>

                    <ButtonComponent
                        type="button"
                        variant="primary"
                        disabled={loading}
                        onClick={onConfirm}
                        className="flex-1 px-5 py-2"
                    >
                        {loading ? "Deleting..." : confirmText}
                    </ButtonComponent>
                </div>
            </div>
        </div>
    );
}