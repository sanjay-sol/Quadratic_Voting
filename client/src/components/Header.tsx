"use client"
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-pink-500">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-slate-800  font-extrabold">Quadratic Voting 🗳️</h1>
      <nav className="hidden md:flex gap-8">
        <ul className="flex gap-8 text-white ">
          <li>
            <a href="/" className="hover:text-gray-300 transition duration-300">Home</a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-300 transition duration-300">About</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-300 transition duration-300">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="md:hidden">
        <button className="text-white" onClick={toggleMenu}>
          <span className="material-icons">menu</span>
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-white p-4 shadow-md rounded-md">
            <ul className="flex flex-col gap-4">
              <li>
                <a href="/" className="text-black">Home</a>
              </li>
              <li>
                <a href="/about" className="text-black">About</a>
              </li>
              <li>
                <a href="/contact" className="text-black">Contact</a>
              </li>
              <li>
                <a href="/know-more" className="text-black">Know More</a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <a href="/know-more" className="text-white hover:text-gray-300 transition duration-300 underline">Know More</a>
      </div>
    </header>
  );
};

export default Header;
