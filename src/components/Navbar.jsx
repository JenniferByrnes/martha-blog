import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth } from 'firebase/auth'
import { useAuthStatus } from '../hooks/useAuthStatus'
import { useNavigate } from 'react-router-dom'
import "./navbar.css";

export default function Navbar() {

  const [nav, setNav] = useState(false)
  const userClick = () => setNav(!nav)
  const navigate = useNavigate()
  const auth = getAuth()
  const { loggedIn, checkingStatus } = useAuthStatus()

  // const location = useLocation()

  // const pathMatchRoute = (route) => {
  //   if(route === location.pathname) {
  //     return true
  //   }
  // }

  const logout = event => {
    // TODO - this should cause a re-render of the NavBar
    // event.preventDefault();
    auth.signOut()
    navigate('/')
  }

  return (
    <header className="w-full bg-stone-200 text-black">
      {/* Container for Nav elements - title and nav */}
      <nav className="container flex justify-between md:items-center max-w-6xl mx-auto px-6 py-1 ">
        <>
          {/* title - link to home */}
          <NavLink to="/"
            className="hover:text-pcCoral">
            <h1>Martha's Musings</h1>
          </NavLink>
        </>
        <>
          {/* Nav Menu */}
          <ul className="hidden md:flex md:space-x-5 items-center justify-around py-2">
            <li className="hover:text-pcCoral hover:border-b hover:border-pcCoral">
              <NavLink to="/photos">Photos</NavLink>
            </li>
            <li className="hover:text-pcCoral hover:border-b hover:border-pcCoral">
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li className="hover:text-pcCoral hover:border-b hover:border-pcCoral">
              <NavLink to="/contact">Contact</NavLink>
            </li>

            {loggedIn ? (
              <>
                <li className="hover:text-pcCoral hover:border-b hover:border-pcCoral">
                  <NavLink to="/profile">Admin</NavLink>
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
                to="/photos">Photos</NavLink>
              <NavLink className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
                to="/blog" >Blog</NavLink>
              <NavLink className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
                to="/contact" >Contact</NavLink>


              {/* Logged in user sees Logout option, otherwise Login/Signin option */}
              {loggedIn ? (
                <li className="">
                  <NavLink className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
                    to="/profile" >Admin</NavLink>
                </li>
              ) : (
                <>
                  <NavLink className="hover:text-pcCoral hover:border-b hover:border-pcCoral"
                    to="/login" >Login</NavLink>
                  <NavLink className="hover:text-pcCoral hover:border-b hover:border-pcCoral" to="/sign-up" >Sign Up</NavLink>
                </>
              )}
            </ul>
          </div>
        </>
      </nav>
    </header>
  );
};

