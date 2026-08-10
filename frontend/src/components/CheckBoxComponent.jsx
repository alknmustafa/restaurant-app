import { Check } from "lucide-react";

export default function CheckBoxComponent({ label, checked, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-3 group"
    >
      <div
        className={`
          w-5 h-5 rounded-md border flex items-center justify-center
          transition-all duration-300
          transform
          ${checked
            ? "bg-red-500 border-red-500 scale-105 shadow-md shadow-red-200"
            : "border-gray-400 scale-100"}
          group-hover:border-red-400 group-hover:scale-105
        `}
      >
        <Check
          size={14}
          className={`
            text-white transition-all duration-200
            ${checked ? "opacity-100 scale-100" : "opacity-0 scale-50"}
          `}
        />
      </div>

      <span
        className={`text-sm transition-colors duration-200
          ${checked ? "text-red-600" : "text-gray-800"}`}
      >
        {label}
      </span>
    </button>
  );
}