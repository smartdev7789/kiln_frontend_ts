import React from "react";

const AddCardComponent = () => {
  return (
    <>
      <p className="text-2xl text-[#707070]">Billing Details</p>
      <div className="block my-6 px-6 pt-3 pb-12 w-full bg-white rounded-lg text-[#707070]">
        <form className="text-sm">
          <div className="grid md:grid-cols-5 my-3">
            <div className="col-span-3 pr-6">
              <div className="relative z-0 mb-5 w-full">
                <span className="tracking-tight px-3 text-xl">Add a Card</span>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Card Holder Name:&nbsp;&nbsp;</span>
                <input
                  name="cardholdername"
                  id="cardholdername"
                  className="w-2/3 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Card Number:&nbsp;&nbsp;</span>
                <input
                  name="cardnumber"
                  id="cardnumber"
                  className="w-2/3 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Expiry Date:&nbsp;&nbsp;</span>
                <input
                  name="expirydate"
                  id="expirydate"
                  className="w-2/3 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>CVC:&nbsp;&nbsp;</span>
                <input
                  name="cvc"
                  id="cvc"
                  className="w-2/3 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <button className="text-[#707070] text-opacity-[0.6499999761581421] float-right bg-white hover:bg-gray-100 border border-gray-300 rounded-lg mt-3 px-5">
                  Add Card
                </button>
              </div>
            </div>

            <div className="col-span-2">
              <p className="tracking-tight px-3 text-xl">Current Card</p>
              <div className="w-full h-48 flex items-center justify-center mt-6 px-3 text-lg">
                PLEASE ADD A PAYMENT CARD
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCardComponent;
