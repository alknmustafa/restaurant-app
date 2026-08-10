export default function CategoryCardComponent({ title, image }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="mt-2 text-sm font-medium">{title}</p>
    </div>
  );
}