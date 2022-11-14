import React from "react";

const AccountDetailComponent = () => {
  return (
    <>
      <p className="text-2xl text-[#707070]">Account Details</p>
      <div className="block my-6 px-6 pt-6 pb-12 w-full bg-white rounded-lg text-[#707070] dark:text-white shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <span className="text-xl tracking-tight px-3">User Details</span>
        <form className="px-6">
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>First Name:&nbsp;&nbsp;</span>
              <input
                name="first_name"
                id="first_name"
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
            <div className="relative z-0 w-full group">
              <span>WhatsApp:&nbsp;&nbsp;</span>
              <input
                name="whatsapp"
                id="whatsapp"
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>Position:&nbsp;&nbsp;</span>
              <input
                name="position"
                id="position"
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
            <div className="relative z-0 w-full group">
              <span>Skype:&nbsp;&nbsp;</span>
              <input
                name="skype"
                id="skype"
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>E-mail:&nbsp;&nbsp;</span>
              <input
                type="email"
                name="email"
                id="email"
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
            <div className="relative z-0 w-full group">
              <span>WeChat:&nbsp;&nbsp;</span>
              <input
                name="wechat"
                id="wechat"
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>Mobile:&nbsp;&nbsp;</span>
              <input
                type="mobile"
                name="mobile"
                id="mobile"
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
            <div className="relative z-0 w-full group">
              <button
                type="submit"
                className="text-[#707070] text-opacity-[0.6499999761581421] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg mt-3 px-5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="block my-14 px-6 pt-6 pb-12 w-3/5 bg-white rounded-lg text-[#707070] dark:text-white shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <span className="text-xl tracking-tight px-3">Password Reset</span>
        <form className="px-6 text-sm">
          <div className="relative z-0 my-3 w-full group text-right">
            <span>Current Password:&nbsp;&nbsp;</span>
            <input
              type="password"
              name="password"
              id="password"
              className="w-2/3 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 my-3 w-full group text-right">
            <span>New Password:&nbsp;&nbsp;</span>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              className="w-2/3 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 my-3 w-full group text-right">
            <span>Retype New Password:&nbsp;&nbsp;</span>
            <input
              type="password"
              name="renewpassword"
              id="renewpassword"
              className="w-2/3 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
          </div>

          <div className="relative z-0 my-3 w-full group text-right">
            <button
              type="submit"
              className="text-[#707070] text-opacity-[0.6499999761581421] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg mt-3 px-5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountDetailComponent;
