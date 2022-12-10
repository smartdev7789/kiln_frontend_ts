import React from "react";
import { scrollToTop } from "../../utils";

const footerItems = ["About", "Services", "Live Games", "News"];

const Footer = () => {
  return (
    <section className="snap-center">
      <div className="bg-[#44178a] landing-width">
        <div className="flex justify-between items-center px-20 py-4 text-white">
          <div>
            <img className="h-8" src="imgs/GameBake_Logo.svg" alt="GameBake" />
          </div>
          <div>
            <p className="text-xs">© {new Date().getFullYear()} GameBake. All Rights Reserved</p>
          </div>
          <div className="w-64 pb-6">
            Socials
            <div className="flex justify-between my-6">
              <img
                className="w-8 h-8"
                src="imgs/social_link1.svg"
                alt="GameBake"
              />
              <img
                className="w-8 h-8"
                src="imgs/social_link2.svg"
                alt="GameBake"
              />
              <img
                className="w-8 h-8"
                src="imgs/social_link3.svg"
                alt="GameBake"
              />
              <img
                className="w-8 h-8"
                src="imgs/social_link4.svg"
                alt="GameBake"
              />
              <img
                className="w-8 h-8"
                src="imgs/social_link5.svg"
                alt="GameBake"
              />
            </div>
          </div>
          <div className="w-64">
            <p className="mb-3">Quick Links</p>
            {footerItems.map((item, i) => (
              <p className="my-2 text-xs" key={"footerItem" + i}>
                <a
                  className="cursor-pointer hover:decoration-[#ff9100] hover:text-white hover:underline-offset-4 hover:decoration-2 focus:decoration-[#ff9100] focus:text-white focus:underline-offset-4 focus:decoration-2"
                  onClick={() =>
                    scrollToTop(
                      document.getElementById("scroll" + (i + 2))?.offsetTop
                    )
                  }
                >
                  {item}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
