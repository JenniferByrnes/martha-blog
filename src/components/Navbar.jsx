import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
//import Auth from '../../utils/auth';
import "./navbar.css";

export default function Navbar() {

  const [nav, setNav] = useState(false);
  const userClick = () => setNav(!nav)
  // const location = useLocation()

  // const pathMatchRoute = (route) => {
  //   if(route === location.pathname) {
  //     return true
  //   }
  // }

  const logout = event => {
    event.preventDefault();
    //Auth.logout();
  };

  return (
    <header className="w-full bg-stone-200 text-black">
      {/* Container for Nav elements - title and nav */}
      <nav className="container flex justify-between md:items-center max-w-6xl mx-auto px-6 py-1">
        <>
          {/* title - link to home */}
          <NavLink to="/"
            className="hover:text-pcCoral">
            <h1>Martha's Musings</h1>
          </NavLink>
        </>
        <>
          {/* Nav Menu */}
          {/* Logged in user sees Logout option, otherwise Login/Signin option */}

          <ul className="hidden md:flex md:space-x-5 items-center justify-around py-2">
            <li className="hover:text-pcCoral hover:border-b hover:border-pcCoral">
              <NavLink to="/photos">Photos</NavLink>
            </li>
            <li className="hover:text-pcCoral hover:border-b hover:border-pcCoral">
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li className="hover:text-pcCoral hover:border-b hover:border-pcCoral">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            {false ? (
              // {Auth.loggedIn() ? (
              <>
                <li className="hover:text-pcCoral hover:border-b hover:border-pcCoral">
                  {/* <NavLink to="/profile">My Posts</NavLink> */}
                  <NavLink to="/" onClick={logout}>Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-pcCoral hover:border-b hover:border-pcCoral">
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li className="hover:text-pcCoral hover:border-b hover:border-pcCoral">
                  <NavLink to="/sign-up">Sign Up</NavLink>
                </li>
              </>)}
          </ul>

          {/* Nav Hamburger Menu */}
          {/* This does animation! */}
          <div onClick={userClick} className="md:hidden z-10 justify-items-end  hover:text-pcCoral hover:text-xl">
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
            </div> : <div className="md:hidden">
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
          </div>

          {/* Mobile Nav Menu */}
          <ul className={
            !nav
              ? "hidden"
              : "top-0 bottom-0 left-0 flex flex-col py-2 text-lg  justify-evenly items-start"
          }>
            <NavLink to="/photos"
              className="hover:text-pcCoral hover:text-xl"
            >Photos</NavLink>
            <NavLink to="/blog" className="hover:text-pcCoral hover:text-xl" >Blog</NavLink>
            <NavLink to="/profile" className="hover:text-pcCoral hover:border-b hover:border-pcCoral">Profile</NavLink>

            {/* Logged in user sees Logout option, otherwise Login/Signin option */}
            {false ? (
              // {Auth.loggedIn() ? (
              <li className="hover:text-pcCoral hover:border-b hover:border-pcCoral">
                {/* <NavLink to="/profile">My Posts</NavLink> */}
                <NavLink to="/" onClick={logout}>
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <NavLink to="/login" className="hover:text-pcCoral hover:text-xl" >Login</NavLink>
                <NavLink to="/sign-up" className="hover:text-pcCoral hover:text-xl" >Sign Up</NavLink>
              </>
            )}
          </ul>
        </>
      </nav>
    </header>
  );
};