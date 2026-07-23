export default function Card({ title, value }) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow
        border
        border-slate-200
        p-5
        md:p-6
        transition-all
        duration-200
        hover:shadow-lg
      "
    >
      <p className="text-sm text-slate-500">{title}</p>

      <p className="mt-2 text-base md:text-lg font-semibold break-words">
        {value}
      </p>
    </div>
  );
}
