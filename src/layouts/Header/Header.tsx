import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

const Header = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <header className="bg-[url('/public/imgs/BG_Purple_Head.svg')] shadow">
      <div className="flex h-12 items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0 ml-2">
            <img className="h-12" src="imgs/GameBake_Logo.svg" alt="GameBake" />
          </div>
          <div className="hidden md:block">
            <div className="ml-1 flex items-baseline space-x-4">
              <Link
                key="dashboard"
                to="/dashboard"
                className="text-white py-2 rounded-md text-sm font-medium hover:no-underline hover:text-white focus:no-underline focus:text-white"
                aria-current={true ? "page" : undefined}
              >
                |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dashboard
              </Link>
              <Link
                key="documentation"
                to="/documentation"
                className="text-white py-2 rounded-md text-sm font-medium hover:no-underline hover:text-white focus:no-underline focus:text-white"
                aria-current={true ? "page" : undefined}
              >
                &nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Documentation
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center">
            <Menu as="div" className="mr-6">
              <div>
                <Menu.Button className="text-white py-2 rounded-md text-sm font-medium">
                  <span>My Account</span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-5 z-10 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item key="profile">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:no-underline hover:text-gray-700 focus:no-underline focus:text-gray-700"
                    >
                      My Profile
                    </Link>
                  </Menu.Item>
                  <hr />
                  <Menu.Item key="logout">
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:no-underline hover:text-gray-700 focus:no-underline focus:text-gray-700"
                    >
                      Log Out
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
