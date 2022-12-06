import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Navigation } from "swiper";
import "../../index.css";
import { scrollToTop } from "../../utils";

const images = [
  "imgs/new_game_image1.svg",
  "imgs/new_game_image2.svg",
  "imgs/new_game_image3.svg",
  "imgs/new_game_image1.svg",
  "imgs/new_game_image2.svg",
];
const titles = [
  "Idle Firefighter Tycoon",
  "Gumslinger",
  "Downhill Smash",
  "Idle Firefighter Tycoon",
  "Gumslinger",
];
const distributors = [
  "By: Kolibri",
  "By: Itatake",
  "By: ZeptoLab",
  "By: Kolibri",
  "By: Itatake",
];
const content =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const Section5Component = () => {
  return (
    <section>
      <div
        id="scroll4"
        className="bg-[url('/public/imgs/Background_Orange.png')] bg-cover landing-width min-h-screen section"
      >
        <div className="section-height flex items-center pb-6">
          <div className="w-full">
            <div className="text-5xl px-36 pt-32 mb-6 lg:mb-20 text-white font-extrabold">
              Newly Distributed Games
            </div>
            <Swiper
              slidesPerView={
                window.outerWidth >= 1500
                  ? 4
                  : window.outerWidth >= 1304
                  ? 3
                  : 2
              }
              spaceBetween={50}
              centeredSlides={false}
              freeMode={true}
              modules={[FreeMode, Navigation]}
              navigation={true}
              className="mySwiper"
            >
              {images.map((image, i) => (
                <SwiperSlide key={"swiper" + i}>
                  <div className="bg-[#8e2500] rounded-2xl">
                    <div className="h-44">
                      <img
                        className="h-full w-full object-cover rounded-2xl"
                        src={image}
                        alt="GameBake"
                      />
                    </div>
                    <div className="px-5 pt-5 pb-4">
                      <p className="text-2xl font-bold text-white">
                        {titles[i]}
                      </p>
                      <p className="text-2xl font-light text-white text-opacity-[0.800000011920929]">
                        {distributors[i]}
                      </p>
                      <p className="text-lg text-white">
                        {window.outerWidth < 1304 && titles[i].length >= 22
                          ? content.substring(0, 130) + "..."
                          : content}
                      </p>
                      <div className="flex justify-center h-12 mt-3">
                        <button type="button">
                          <img
                            className="h-full"
                            src="imgs/new_game_button.svg"
                            alt="GameBake"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="text-center py-3">
          <button
            type="button"
            onClick={() =>
              scrollToTop(document.getElementById("scroll5")?.offsetTop)
            }
          >
            <img className="w-7" src="imgs/Arrow.svg" alt="GameBake" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section5Component;
