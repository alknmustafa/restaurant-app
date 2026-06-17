export default function CuisineLabelComponent({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`absolute bottom-5 left-5 bg-white text-gray-500 px-4 py-1 rounded-3xl text-lg border ${className}`}
    >
      {children}
    </button>
  );
}