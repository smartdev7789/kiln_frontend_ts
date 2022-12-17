import React from "react";
import { scrollToTop } from "../../utils";

const footerItems = ["About", "Services", "Live Games", "News"];

const Footer = () => {
  return (
    <section className="snap-start">
      <div className="bg-[#44178a]">
        <div className="flex justify-between items-center px-20 py-4 text-white">
          <div>
            <img className="h-8" src="imgs/GameBake_Logo.svg" alt="GameBake" />
          </div>
          <div>
            <p className="text-xs">
              © {new Date().getFullYear()} GameBake. All Rights Reserved
            </p>
          </div>
          <div className="w-64 pb-6">
            Socials
            <div className="flex justify-between my-6">
              {[...Array(5)].map((item, idx) => (
                <div className={"w-8 h-8 cursor-pointer social_link_btn" + (idx + 1)}/>
              ))}
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
