import CheckBoxComponent from "./CheckBoxComponent";

export default function FilterSectionComponent({
  title,
  items,
  filters,
  toggle,
}) {
  return (
    <div className="flex flex-col gap-4 mt-10">

      <h1 className="font-semibold text-lg">
        {title}
      </h1>

      <div className="flex flex-col gap-4 mt-1">

        {items.map((item) => (
          <CheckBoxComponent
            key={item.key}
            label={item.label}
            checked={!!filters[item.key]}
            onToggle={() => toggle(item.key, item.label)}
          />
        ))}

      </div>
    </div>
  );
}