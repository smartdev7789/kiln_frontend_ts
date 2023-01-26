import React from "react";
import { scrollToTop } from "../../utils";

const icons = [
  "imgs/service_icon1.svg",
  "imgs/service_icon2.svg",
  "imgs/service_icon3.svg",
  "imgs/service_icon4.svg",
  "imgs/service_icon5.svg",
  "imgs/service_icon6.svg",
];
const titles = [
  "Distribute Worldwide",
  "SDK-FREE Tech",
  "Simple Setup",
  "Effective Monetisation",
  "UA Opportunities",
  "Full Transparency",
];
const contents = [
  "Opportunities are out there, waiting for you and your games. Don’t let them pass you by. Easily choose the channels you wish to deploy to with the click of a button.",
  "We know each and every SDK means more work, more updates, more upkeep, just more pains. That is why our tech, KILN, has no SDK. Simply upload with little work and start distributing!",
  "Setting up your developer accounts, merchant accounts and your games on each new channel is a pain. We keep it simple, we make it easy, just log in to your dashboard and get going!",
  "Your games need to make money and that is why GameBake has worked tirelessly to make sure that your games have the same monetisation opportunities you expect elsewhere.",
  "Promotions are amazing! But you need more opportunities to scale and more control. That is why GameBake provides the UA you have come to know and love. Spend. Profit. Scale.",
  "So many services have hidden fees and secret margins. Not GameBake. We tell you your revenue shares we show you our fees and you get paid direct by all channels and services.",
];

const Section4Component = () => {
  return (
    <section className="snap-start">
      <div
        id="scroll3"
        className="bg-[url('/public/imgs/Background_Purple.png')] bg-cover min-h-screen section"
      >
        <div className="section-height flex items-center justify-center px-36 pt-28 mx-auto w-[100em]">
          <div>
            <div className="text-5xl mb-2 text-white font-extrabold">
              Services
            </div>
            <div className="grid grid-cols-12 gap-5 pl-10">
              {icons.map((icon, i) => (
                <div className="col-span-4 animation animation-fadeInUp"  style={{transitionDelay: i * 0.6 + "s"}} key={"service" + i}>
                  <div className="h-20">
                    <img className="h-full w-1/3" src={icon} alt="GameBake" />
                  </div>
                  <p className="text-2xl font-bold text-white my-3">
                    {titles[i]}
                  </p>
                  <p className="text-white my-3 text-sm">{contents[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center pb-3">
          <button
            type="button"
            onClick={() =>
              scrollToTop(document.getElementById("scroll4")?.offsetTop)
            }
          >
            <img className="w-7" src="imgs/Arrow.svg" alt="GameBake" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section4Component;
