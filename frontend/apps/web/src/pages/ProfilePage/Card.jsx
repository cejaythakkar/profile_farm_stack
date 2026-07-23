export default function Card({ title, value }) {
  return (
    <div
      className="
        h-full
        bg-white
        rounded-xl
        border
        border-slate-200
        shadow
        p-4
        xs:p-5
        md:p-6
        transition-all
        duration-200
        hover:shadow-lg
      "
    >
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p
        className="
          mt-2
          text-sm
          xs:text-base
          md:text-lg
          font-semibold
          break-words
          leading-relaxed
        "
      >
        {value}
      </p>
    </div>
  );
}