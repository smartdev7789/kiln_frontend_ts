import React from "react";

const Section1Component = () => {
  return (
    <div className="bg-[#7700DF] bg-cover landing-width h-screen">
      <div className="flex section-height px-16 items-center">
        <div className="w-1/2 px-20">
          <div className="text-5xl mb-4 text-white font-extrabold">
            Reach more users with less effort
          </div>
          <p className="text-xl text-[#d1baf5] mb-8">
            Game distribution should be simple, but it isn’t. Don’t worry
            though, GameBake has your back. Take a look at how we are changing
            the game!
          </p>
          <div className="flex">
            <button
              type="button"
              className="text-white bg-[#ff9100] hover:bg-[#ee8000] mr-7 shadow-lg rounded-md px-16 py-4"
            >
              Learn More
            </button>
            <button
              type="button"
              className="text-white bg-[#44178A99] border-white border hover:opacity-[0.3] shadow-lg rounded-md px-12 py-4"
            >
              Let’s Talk
            </button>
          </div>
        </div>
        <div className="w-1/2 pr-10 pt-20">
          <img
            className="w-auto"
            src="imgs/GameBake_Hero_Motion2.gif"
            alt="GameBake"
          />
        </div>
      </div>
      <div className="text-center">
        <button type="button">
          <img
            className="w-7"
            src="imgs/Arrow.svg"
            alt="GameBake"
          />
        </button>
      </div>
    </div>
  );
};

export default Section1Component;
