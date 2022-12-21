import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCreateContact } from "../../schemas/contact.schema";
import { allCountries } from "../../allConstants/countries/all";
interface IFormInputs {
  name: string;
  companyName: string;
  email: string;
  account: string;
  countries: string;
  website: string;
  message: string;
}

const Section7Component = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schemaCreateContact()),
  });

  const onSubmit = async (data: IFormInputs) => {
    console.log(data);
  };

  return (
    <section className="snap-start">
      <div id="scroll6" className="bg-[#44178A] bg-cover section">
        <div className="section7-height flex items-center justify-center px-36 py-6">
          <div>
            <div className="text-5xl mb-20 text-white font-extrabold">
              Get in touch!
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-3 gap-4 gap-x-4 gap-y-8 px-16">
                <div>
                  <input
                    className="bg-[#7700df] text-white placeholder-white block px-5 py-4 w-full"
                    placeholder="Name"
                    {...register("name")}
                  />
                  <span className="text-red-700">
                    {errors.name && errors.name?.message}
                  </span>
                </div>
                <div>
                  <input
                    className="bg-[#7700df] text-white placeholder-white block px-5 py-4 w-full"
                    placeholder="Company Name"
                    {...register("companyName")}
                  />
                  <span className="text-red-700">
                    {errors.companyName && errors.companyName?.message}
                  </span>
                </div>
                <div>
                  <input
                    type="email"
                    className="bg-[#7700df] text-white placeholder-white block px-5 py-4 w-full"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <span className="text-red-700">
                    {errors.email && errors.email?.message}
                  </span>
                </div>
                <div>
                  <input
                    className="bg-[#7700df] text-white placeholder-white block px-5 py-4 w-full"
                    placeholder="App Store Account - Game Url"
                    {...register("account")}
                  />
                  <span className="text-red-700">
                    {errors.account && errors.account?.message}
                  </span>
                </div>
                <div className="signupselect h-fit">
                  <select
                    id="countries"
                    className="bg-[#7700df] text-white focus:ring-blue-500 focus:border-blue-500 px-5 py-4 w-full"
                    {...register("countries")}
                  >
                    {allCountries.map((country, i) => (
                      <option value={country.code} className="bg-[#7700df]" key={"country" + i}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-700">
                    {errors.countries && errors.countries?.message}
                  </span>
                </div>
                <div>
                  <input
                    className="bg-[#7700df] text-white placeholder-white block px-5 py-4 w-full"
                    placeholder="Website"
                    {...register("website")}
                  />
                  <span className="text-red-700">
                    {errors.website && errors.website?.message}
                  </span>
                </div>
                <div className="col-span-2">
                  <textarea
                    rows={1}
                    className="bg-[#7700df] text-white placeholder-white block px-5 py-6 w-full"
                    placeholder="Your Message"
                    {...register("message")}
                  />
                  <span className="text-red-700">
                    {errors.message && errors.message?.message}
                  </span>
                </div>
                <div>
                  <button
                    type="submit"
                    className="text-white bg-[#ff9100] hover:bg-[#ee8000] mr-7 shadow-lg rounded-sm px-16 py-[1.35rem] w-full"
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section7Component;
