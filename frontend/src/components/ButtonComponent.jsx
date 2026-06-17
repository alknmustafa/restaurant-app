export default function ButtonComponent({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "px-6 py-2 rounded-3xl transition";

  const variants = {
    primary:
      "bg-red-600 text-white rounded-full hover:bg-red-700 transition",
    secondary:
      "border border-gray-500 text-gray-500 rounded-full hover:bg-gray-600 hover:text-white transition",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}