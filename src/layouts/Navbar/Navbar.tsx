import React, { useRef, useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../utils";

const navbarItems = [
  "Home",
  "About",
  "Services",
  "Live Games",
  "News",
  "Contact",
];

const animationElements = document.getElementsByClassName("animation");

// const scrolling = (i: number) => {
//   scrollToTop(
//     document.getElementById("section" + i)?.offsetTop? - 20)
// }

const Navbar = () => {
  const navigate = useNavigate();
  const [curSec, setCurSec] = useState(0);

  const animationPlay = () => {
    for (var i = 0; i < animationElements.length; i++) {
      let ele = animationElements[i];
      let offset = ele.getBoundingClientRect().top;
      let screenHeight = window.innerHeight;
      if (offset < screenHeight && !ele.classList.contains("active")) {
        ele.classList.add("active");
      }
    }
  };

  const handleScroll = useCallback(() => {
    for (var i = 0; i < 6; i++) {
      if (
        Number(document.getElementById("landing")?.scrollTop) >=
          Number(document.getElementById("scroll" + (i + 1))?.offsetTop) &&
        Number(document.getElementById("landing")?.scrollTop) <
          Number(document.getElementById("scroll" + (i + 1))?.offsetTop) +
            Number(document.getElementById("scroll" + (i + 1))?.scrollHeight)
      ) {
        break;
      }
    }
    setCurSec(i == 6 ? 1 : i);
    
    animationPlay();
  }, []);

  useEffect(() => {
    animationPlay();
    document.getElementById("landing")?.addEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="snap-start">
      <nav className="rounded fixed landing-width backdrop-blur-sm z-50">
        <div className="flex flex-wrap items-center justify-between py-6 px-8">
          <Link key="landing" to="/" className="flex items-center">
            <img className="h-8" src="imgs/GameBake_Logo.svg" alt="GameBake" />
          </Link>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="text-white flex flex-col mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              {navbarItems.map((item, i) => (
                <li key={"nav" + i}>
                  <a
                    className={
                      "cursor-pointer block py-2 px-1 rounded hover:decoration-[#ff9100] hover:text-white hover:underline-offset-4 hover:decoration-2 focus:decoration-[#ff9100] focus:text-white focus:underline-offset-4 focus:decoration-2 " +
                      (curSec === i ? "underline underline-offset-4 decoration-[#ff9100] decoration-2" : "")
                    }
                    onClick={() =>
                      scrollToTop(
                        document.getElementById("scroll" + (i + 1))?.offsetTop
                      )
                    }
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
    </section>
  );
};

export default Navbar;
