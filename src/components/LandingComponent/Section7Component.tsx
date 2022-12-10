import React from "react";

const titles = ["Title", "Title", "Title", "Title"];
const Section7Component = () => {
  return (
    <section>
      <div id="scroll6" className="bg-[#4d1aa0] bg-cover landing-width section">
        <div className="section7-height flex items-center justify-center px-36 py-6">
          <div>
            <div className="text-5xl mb-8 text-white font-extrabold">
              Get in touch!
            </div>
            <div className="grid grid-cols-3 gap-4 gap-x-4 gap-y-8 px-16">
              <div>
                <input
                  name="name"
                  className="bg-[#7700df] text-white placeholder-white block px-5 py-4 w-full"
                  placeholder="Name"
                />
              </div>
              <div>
                <input
                  name="company_name"
                  className="bg-[#7700df] text-white placeholder-white block px-5 py-4 w-full"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  className="bg-[#7700df] text-white placeholder-white block px-5 py-4 w-full"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  name="game_url"
                  className="bg-[#7700df] text-white placeholder-white block px-5 py-4 w-full"
                  placeholder="App Store Account - Game Url"
                />
              </div>
              <div className="relative">
                <div className="signupselect absolute bottom-0 left-0 right-0">
                  <select
                    id="countries"
                    name="countries"
                    className="bg-[#7700df] text-white focus:ring-blue-500 focus:border-blue-500 block px-5 py-4 w-full"
                  >
                    <option value="UK" className="bg-[#7700df]">United Kingdom</option>
                    <option value="CA" className="bg-[#7700df]">Canada</option>
                    <option value="FR" className="bg-[#7700df]">France</option>
                    <option value="DE" className="bg-[#7700df]">Germany</option>
                  </select>
                </div>
              </div>
              <div>
                <input
                  name="website"
                  className="bg-[#7700df] text-white placeholder-white block px-5 py-4 w-full"
                  placeholder="Website"
                />
              </div>
              <div className="col-span-2">
                <input
                  name="message"
                  className="bg-[#7700df] text-white placeholder-white block px-5 py-5 w-full"
                  placeholder="Your Message"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="text-white bg-[#ff9100] hover:bg-[#ee8000] mr-7 shadow-lg rounded-sm px-16 py-4 w-full"
                >
                  <div className="flex justify-center px-10 items-center text-lg">
                    Send{" "}
                    <img
                      className="rotate-[270deg] w-5 h-5 ml-6"
                      src="imgs/dropdown_arrow.svg"
                      alt="GameBake"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section7Component;
