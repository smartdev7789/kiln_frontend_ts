import React from "react";
import { scrollToTop } from "../../utils";

const Section3Component = () => {
  return (
    <section className="snap-center">
      <div
        id="section3"
        className="bg-[#44178A] bg-cover landing-width min-h-screen section"
      >
        <div className="section-height flex items-center justify-center px-16 pt-32">
          <div>
            <div className="w-1/2 pl-20">
              <div className="text-5xl mb-4 text-white font-extrabold animation animation-fadeInUp">
                Game Growth
              </div>
              <p className="text-white mb-8 pl-3 animation animation-fadeInUp" style={{transitionDelay: "0.6s"}}>
                You understand your core business and GameBake isn’t here to
                tell you what you should be doing. GameBake exists to help you
                grow a brand-new, incremental revenue stream. No BS. No
                complicated systems. Simply upload and take advantage of new
                opportunities globally.
              </p>
            </div>
            <div className="float-right z-10 w-2/3 h-full">
              <img src="imgs/DataGraphic.gif" alt="GameBake"></img>
            </div>
          </div>
        </div>
        <div className="text-center py-3">
          <button
            type="button"
            onClick={() =>
              scrollToTop(document.getElementById("scroll3")?.offsetTop)
            }
          >
            <img className="w-7" src="imgs/Arrow.svg" alt="GameBake" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section3Component;
