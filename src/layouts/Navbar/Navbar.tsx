import React from "react";
import { useNavigate } from "react-router-dom";

const navbarItems = [
  "Home",
  "About",
  "Services",
  "Live Games",
  "News",
  "Contract",
];

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="rounded fixed landing-width backdrop-blur-sm bg-[#7700df33] z-50">
      <div className="flex flex-wrap items-center justify-between p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img className="h-8" src="imgs/GameBake_Logo.svg" alt="GameBake" />
        </a>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="text-white flex flex-col mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            {navbarItems.map((item) => (
              <li>
                <a
                  href="#"
                  className="block py-2 px-1 rounded hover:decoration-[#ff9100] hover:text-white hover:underline-offset-4 hover:decoration-2 focus:decoration-[#ff9100] focus:text-white focus:underline-offset-4 focus:decoration-2"
                  aria-current="page"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="block text-white bg-[#ff9100] hover:bg-[#ee8000] shadow-md rounded-md px-8 py-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
