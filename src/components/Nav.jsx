"use client";
import { Link as ScrollLink } from "react-scroll";
const links = [
  {
    name: "home",
  },
  {
    name: "about",
  },
  {
    name: "journey",
  },
  {
    name: "work",
  },
  {
    name: "blog",
  },
  {
    name: "contact",
  },
];
const Nav = ({ containerStyle, listStyles, linkStyles = "", spy }) => {
  return (
    <nav className={containerStyle}>
      <ul className={listStyles + " flex gap-6"}>
        {links.map((link, index) => {
          return (
            <ScrollLink
              spy={spy}
              key={index}
              activeClass="active"
              to={link.name}
              smooth
              className={`relative cursor-pointer font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-in-out hover:scale-110 hover:underline hover:underline-offset-8 hover:decoration-4 hover:from-pink-500 hover:to-blue-500 active:scale-105 active:from-purple-600 active:to-pink-600 ${linkStyles}`}
            >
              {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </ScrollLink>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
