import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItem, setOpenCart } from "../app/CartSlice";

const NavBar = () => {
  const [navState, setNavState] = useState(false);
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItem);

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);
    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${
          navState
            ? "fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center z-50 blur-effect-theme "
            : "absolute top-7 left-0 right-0 opacity-100 z-50 "
        }`}
      >
        <nav className="flex justify-between nike-container">
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo-img"
              className={`w-16 h-auto ${navState && "filter brightness-0"}`}
            />
          </div>
          <ul className="flex items-center justify-center gap-2">
            <li className="grid items-center">
              <MagnifyingGlassIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
              />
            </li>
            <li className="grid items-center">
              <HeartIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
              />
            </li>
            <li className="grid items-center">
              <button
                className="border-none outline-none active:scale-110 transition-all duration-300 relative"
                type="button"
                onClick={()=>dispatch(setOpenCart({cartState:true}))}
              >
                <ShoppingBagIcon
                  className={`icon-style ${
                    navState && "text-slate-900 transition-all duration-300"
                  }`}
                />
                <div
                  className={`absolute top-4 right-0  shadow  w-4 h-4 text-[0.65rem] leading-tight 
                font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300
                ${
                  navState
                    ? "bg-slate-900 text-slate-100 shadow-slate-900"
                    : "bg-white text-slate-900 shadow-slate-100"
                }`}
                >
                  {cartItem.length}
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
