import React from "react";

const BusinessDetailComponent = () => {
  return (
    <>
      <p className="text-2xl text-[#707070]">Company Details</p>
      <div className="block my-6 px-6 pt-3 pb-12 w-full bg-white rounded-lg text-[#707070]">
        <form className="text-sm">
          <div className="grid md:grid-cols-5 my-3">
            <div className="col-span-3 pr-6">
              {/* Company Legal Information */}

              <div className="relative z-0 mb-5 w-full">
                <span className="tracking-tight px-3 text-xl">
                  Company Legal Information
                </span>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Registered/Legal Name:&nbsp;&nbsp;</span>
                <input
                  name="registeredname"
                  id="registeredname"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <div className="flex">
                  <div className="w-2/5">
                    <span>Registered/Legal Address:&nbsp;&nbsp;</span>
                  </div>
                  <div className="w-3/5">
                    <input
                      name="registeredaddress"
                      id="registeredaddress"
                      className="w-full pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <input
                      name="registeredaddress"
                      id="registeredaddress"
                      className="w-full pt-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <input
                      name="registeredaddress"
                      id="registeredaddress"
                      className="w-full pt-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>State/Province:&nbsp;&nbsp;</span>
                <input
                  name="province"
                  id="province"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Company Number:&nbsp;&nbsp;</span>
                <input
                  name="companynumber"
                  id="companynumber"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>VAT/Tax Number:&nbsp;&nbsp;</span>
                <input
                  name="taxnumber"
                  id="taxnumber"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>

              {/* Company Support Information */}

              <div className="relative z-0 mt-9 mb-5 w-full">
                <span className="tracking-tight px-3 text-xl">
                  Company Support Information
                </span>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Developer Name:&nbsp;&nbsp;</span>
                <input
                  name="developername"
                  id="developername"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Support Email:&nbsp;&nbsp;</span>
                <input
                  type="email"
                  name="supportemail"
                  id="supportemail"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Privacy Policy Link:&nbsp;&nbsp;</span>
                <input
                  name="policylink"
                  id="policylink"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Terms of Service Link:&nbsp;&nbsp;</span>
                <input
                  name="servicelink"
                  id="servicelink"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>

              {/* Bank Information */}

              <div className="relative z-0 mt-9 mb-5 w-full">
                <span className="tracking-tight px-3 text-xl">
                  Bank Information
                </span>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Bank Name:&nbsp;&nbsp;</span>
                <input
                  name="bankname"
                  id="bankname"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Bank Address:&nbsp;&nbsp;</span>
                <input
                  name="bankaddress"
                  id="bankaddress"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Branch Name:&nbsp;&nbsp;</span>
                <input
                  name="branchname"
                  id="branchname"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Account Name:&nbsp;&nbsp;</span>
                <input
                  name="accountname"
                  id="accountname"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Account Type:&nbsp;&nbsp;</span>
                <input
                  name="accounttype"
                  id="accounttype"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Currency:&nbsp;&nbsp;</span>
                <input
                  name="currency"
                  id="currency"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Bank Number:&nbsp;&nbsp;</span>
                <input
                  name="banknumber"
                  id="banknumber"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Account Number:&nbsp;&nbsp;</span>
                <input
                  name="accountnumber"
                  id="accountnumber"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Sort-Code:&nbsp;&nbsp;</span>
                <input
                  name="sortcode"
                  id="sortcode"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>IBAN:&nbsp;&nbsp;</span>
                <input
                  name="iban"
                  id="iban"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>SWIFTBIC:&nbsp;&nbsp;</span>
                <input
                  name="swiftbic"
                  id="swiftbic"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>ACH Routing Number:&nbsp;&nbsp;</span>
                <input
                  name="achroutingnumber"
                  id="achroutingnumber"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Fedwire Routing Number:&nbsp;&nbsp;</span>
                <input
                  name="fedroutingnumber"
                  id="fedroutingnumber"
                  className="w-3/5 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
            </div>
            <div className="col-span-2 flex flex-col">
              {/* Company Incorporation Certificate Card */}

              <span className="tracking-tight px-3 text-xl">
                Company Incorporation Certificate
              </span>
              <div className="w-full mt-6 px-3">
                <label
                  // for="dropzone-file"
                  className="flex flex-col justify-center items-center w-full h-56 bg-[#f4f4f4] rounded-xl border-0 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <img
                      className="h-32 opacity-[0.0530988983809948]"
                      src="imgs/upload.svg"
                      alt="GameBake"
                    />
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
                <button className="text-[#707070] text-opacity-[0.6499999761581421] float-right bg-white hover:bg-gray-100 border border-gray-300 rounded-lg mt-3 px-5">
                  Upload
                </button>
              </div>

              {/* VAT / Tax Certificate Card */}

              <span className="tracking-tight px-3 text-xl mt-8">
                VAT / Tax Certificate
              </span>
              <div className="w-full mt-6 px-3">
                <label
                  // for="dropzone-file"
                  className="flex flex-col justify-center items-center w-full h-56 bg-[#f4f4f4] rounded-xl border-0 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <img
                      className="h-32 opacity-[0.0530988983809948]"
                      src="imgs/upload.svg"
                      alt="GameBake"
                    />
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
                <button className="text-[#707070] text-opacity-[0.6499999761581421] float-right bg-white hover:bg-gray-100 border border-gray-300 rounded-lg mt-3 px-5">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BusinessDetailComponent;
