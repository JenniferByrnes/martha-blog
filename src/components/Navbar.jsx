import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./navbar.css";
import { SocialIcon } from 'react-social-icons';

export default function Navbar() {

  const [nav, setNav] = useState(false)
  const userClick = () => setNav(!nav)

  return (
    <header className="w-full bg-stone-200 text-black">
      {/* Container for Nav elements - title and nav */}
      <nav className="container flex justify-between md:items-center max-w-6xl mx-auto px-6 py-1 ">
        <span className="flex justify-between space-x-2 md:items-center">
          {/* title - link to home - formatted to to left of other nav items*/}
          <NavLink
            className="hover:text-pcCoral"
            to="/"><h1>Martha's Musings</h1>
          </NavLink>
          <SocialIcon url="https://www.instagram.com/burfordmartha/" bgColor="#546a7b" style={{ height: 25, width: 25 }} />
        </span>
        <>
          {/* right side of Nav Menu */}
          <ul className="hidden md:flex md:space-x-5 items-center justify-around py-2">
            <NavLink
              className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
              to="/airbnb">Airbnb</NavLink>
            <NavLink className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
              to="/blog" >Blog</NavLink>
            <NavLink className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
              to="/contact" >Contact</NavLink>
            {/* PrivateRoute.jsx checks auth and sends user to login if needed. */}
            <NavLink className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
              to="/profile" >Admin</NavLink>
          </ul>

          {/* Nav Hamburger Menu */}
          {/* This does animation using the navbar.css file! */}
          <div onClick={userClick} className="md:hidden z-10 justify-items-end">
            {!nav ? <div className="md:hidden">
              <button
                id="menu-btn"
                type="button"
                className="z-40 block hamburger md:hidden focus:outline-none"
              >
                <span className="hamburger-top"></span>
                <span className="hamburger-middle"></span>
                <span className="hamburger-bottom"></span>
              </button>
            </div> : <div>
              <button
                id="menu-btn"
                type="button"
                className="z-40 block hamburger md:hidden focus:outline-none open"
              >
                <span className="hamburger-top"></span>
                <span className="hamburger-middle"></span>
                <span className="hamburger-bottom"></span>
              </button>
            </div>}

            {/* Mobile Nav Menu */}
            <ul className={
              !nav
                ? "hidden"
                : "top-0 bottom-0 left-0 flex flex-col py-2 text-lg justify-evenly items-start "
            }>
              <NavLink
                className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
                to="/airbnb">Airbnb</NavLink>
              <NavLink className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
                to="/blog" >Blog</NavLink>
              <NavLink className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
                to="/contact" >Contact</NavLink>
              {/* PrivateRoute.jsx checks auth and sends user to login if needed. */}
              <NavLink className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
                to="/profile" >Admin</NavLink>
            </ul>
          </div>
        </>
      </nav>
    </header>
  );
};

