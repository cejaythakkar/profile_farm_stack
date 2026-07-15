import React from 'react';
import {  NavLink } from 'react-router-dom';
import Logo from './components/Logo';

export const Header = ({ navItems, user, logoutHandler }) => {
  return (
    <header className="text-gray-600 body-font">
      <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Logo />
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {navItems
            .filter((navItem) => navItem.show)
            .map(({ LinkComponent, linkProps, show, text, key }) => (
              <>
                <NavLink
                  {...linkProps}
                  relpace={true}
                  key={key}
                  className={({isActive}) => `text-lg  mx-2 ${isActive ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-900'}`}
                >
                  {text}
                </NavLink>
              </>
            ))}
        </nav>
        {user ? (
          <button
            onClick={logoutHandler}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        ) : null}
      </div>
    </header>
  );
};
