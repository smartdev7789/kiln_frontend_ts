import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#44178a] landing-width">
      <div className="flex justify-between items-center px-20 py-4 text-white">
        <div>
          <img className="h-8" src="imgs/GameBake_Logo.svg" alt="GameBake" />
        </div>
        <div>
          <p className="text-xs">© 2022 GameBake. All Rights Reserved</p>
        </div>
        <div className="w-64 pb-6">
          Socials
          <div className="flex justify-between my-6">
            <img className="w-8 h-8" src="imgs/social_link1.svg" alt="GameBake" />
            <img className="w-8 h-8" src="imgs/social_link2.svg" alt="GameBake" />
            <img className="w-8 h-8" src="imgs/social_link3.svg" alt="GameBake" />
            <img className="w-8 h-8" src="imgs/social_link4.svg" alt="GameBake" />
            <img className="w-8 h-8" src="imgs/social_link5.svg" alt="GameBake" />
          </div>
        </div>
        <div className="w-64">
          <p className="mb-3">Quick Links</p>
          <p className="my-2 text-xs"><a href="#">About</a></p>
          <p className="my-2 text-xs"><a href="#">Services</a></p>
          <p className="my-2 text-xs"><a href="#">Testimonials</a></p>
          <p className="mt-2 text-xs"><a href="#">Blog</a></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
