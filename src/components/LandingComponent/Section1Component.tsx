import React from "react";
import { scrollToTop } from "../../utils";

const Section1Component = () => {
  return (
    <section className="snap-start">
      <div
        id="scroll1"
        className="bg-[url('/public/imgs/Background_Purple.png')] bg-cover h-screen"
      >
        <div className="flex section-height px-16 items-center mx-auto w-[100em]">
          <div className="w-1/2 px-20">
            <div className="text-5xl mb-4 text-white font-extrabold animation animation-fadeInUp">
              Reach more users with less effort
            </div>
            <p className="text-xl text-[#d1baf5] mb-8 animation animation-fadeInUp" style={{transitionDelay: "0.6s"}}>
              Game distribution should be simple, but it isn’t. Don’t worry
              though, GameBake has your back. Take a look at how we are changing
              the game!
            </p>
            <div className="flex animation animation-fadeInUp" style={{transitionDelay: "1.2s"}}>
              <button
                type="button"
                className="text-white bg-[#ff9100] hover:bg-[#ee8000] mr-7 shadow-lg rounded-md px-16 py-4"
                onClick={() =>
                  scrollToTop(
                    document.getElementById("scroll2")?.offsetTop
                  )
                }
              >
                Learn More
              </button>
              <button
                type="button"
                className="text-white bg-[#44178A99] outline outline-1 hover:bg-[#ee8000] hover:outline-none shadow-lg rounded-md px-12 py-4"
                onClick={() =>
                  scrollToTop(
                    document.getElementById("scroll6")?.offsetTop
                  )
                }
              >
                Let’s Talk
              </button>
            </div>
          </div>
          <div className="w-1/2 pr-10 pt-20">
            <img
              className="h-auto w-full"
              src="imgs/GameBake_Hero_Motion2.gif"
              alt="GameBake"
            />
          </div>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={() =>
              scrollToTop(document.getElementById("scroll2")?.offsetTop)
            }
          >
            <img className="w-7" src="imgs/Arrow.svg" alt="GameBake" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section1Component;
