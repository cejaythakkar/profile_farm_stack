import { useEffect, useState } from 'react';

const quotes = [
  'Building scalable applications one commit at a time.',
  'Code. Learn. Improve.',
  'Turning ideas into products.',
  'Clean code is a feature.',
];

const HeroSection = ({ personalDetails }) => {
  const [quote, setQuote] = useState(quotes[0]);
  useEffect(() => {
    const timer = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 lg:py-20 text-center">
        {/* Profile Image */}

        <img
          src={personalDetails.profileImage}
          alt={personalDetails.name}
          className="
        w-28 h-28
        sm:w-32 sm:h-32
        md:w-40 md:h-40
        rounded-full
        object-cover
        border-4
        border-white
        shadow-2xl
        mx-auto
      "
        />

        {/* Name */}

        <h1
          className="
        mt-6
        text-3xl
        sm:text-4xl
        md:text-5xl
        font-bold
        tracking-tight
      "
        >
          {personalDetails.name}
        </h1>

        {/* Position */}

        <p
          className="
        mt-3
        text-base
        sm:text-lg
        md:text-xl
        text-slate-300
      "
        >
          Senior Full Stack Developer
        </p>

        {/* Quote */}

        <p
          className="
        mt-6
        max-w-2xl
        mx-auto
        italic
        text-sm
        sm:text-base
        md:text-lg
        text-slate-200
        leading-relaxed
        transition-all
        duration-500
      "
        >
          "{quote}"
        </p>

        {/* Quick Info */}

        <div
          className="
        mt-8
        flex
        flex-col
        sm:flex-row
        items-center
        justify-center
        gap-3
        sm:gap-8
        text-sm
        md:text-base
        text-slate-300
      "
        >
          <span className="flex items-center gap-2">
            📧 {personalDetails.email}
          </span>

          <span className="hidden sm:block text-slate-500">•</span>

          <span>🌍 {personalDetails.nationality}</span>

          <span className="hidden sm:block text-slate-500">•</span>

          <span>📍 Ahmedabad, India</span>
        </div>

        {/* CTA Buttons */}

        <div
          className="
        mt-10
        flex
        flex-col
        sm:flex-row
        justify-center
        items-center
        gap-4
      "
        >
          <a
            href="#projects"
            className="
          px-6
          py-3
          rounded-lg
          bg-blue-600
          hover:bg-blue-700
          transition
          font-medium
        "
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="
          px-6
          py-3
          rounded-lg
          border
          border-slate-500
          hover:bg-slate-800
          transition
          font-medium
        "
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
