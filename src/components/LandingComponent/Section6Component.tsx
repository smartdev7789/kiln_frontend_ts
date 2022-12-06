import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Navigation } from "swiper";
import "../../index.css";
import { scrollToTop } from "../../utils";

const titles = ["Title", "Title", "Title", "Title", "Title"];
const Section6Component = () => {
  return (
    <section>
      <div
        id="scroll5"
        className="bg-[url('/public/imgs/BG_Purple.svg')] bg-cover landing-width min-h-screen section"
      >
        <div className="section-height flex items-center pb-6">
          <div className="w-full">
            <div className="text-5xl mb-6 lg:mb-20 text-white font-extrabold px-36 pt-32">
              Latest News
            </div>
            <Swiper
              slidesPerView={window.outerWidth >= 1500 ? 4 : 3}
              spaceBetween={50}
              centeredSlides={false}
              freeMode={true}
              navigation={true}
              modules={[FreeMode, Navigation]}
              className="mySwiper"
            >
              {titles.map((title, i) => (
                <SwiperSlide key={"news" + i}>
                  <div className="bg-[#44178a] rounded-2xl">
                    <div className="h-44">
                      <img
                        className="h-full w-full object-cover rounded-2xl"
                        src="imgs/blog.png"
                        alt="GameBake"
                      />
                    </div>
                    <div className="px-8 pt-8 pb-6">
                      <p className="text-2xl font-bold text-white">{title}</p>
                      <p className="text-2xl font-light text-white text-opacity-[0.800000011920929]">
                        Author’s name
                      </p>
                      <p className="text-lg text-white text-opacity-[0.800000011920929]">
                        After Working vasdjerh asd aslşjaAfter Working vasdjerh
                        asd aslşjaAfter Working vasdjerh asd aslşjaAfter ssxas
                        frwad dasd sdadf as…
                      </p>
                      <p>
                        <a href="#" className="text-xl text-white underline">
                          Read More
                        </a>
                      </p>
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
              scrollToTop(document.getElementById("scroll6")?.offsetTop)
            }
          >
            <img className="w-7" src="imgs/Arrow.svg" alt="GameBake" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section6Component;
