import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center ">
      <div className="animate-logo flex items-center">
        {' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-10 h-10  p-2 bg-white text-blue-700 group-hover:bg-blue-700 group-hover:text-white rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-1 text-xl">My Profile</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
