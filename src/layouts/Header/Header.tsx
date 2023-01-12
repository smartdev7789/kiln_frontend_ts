import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

const Header = () => {
  const location = useLocation();
  const channels = [];
  for (let i = 0; i < 30; i++) {
    channels.push("channel" + ((i % 9) + 1) + ".svg");
  }

  return (
    <header className="bg-[url('/public/imgs/BG_Purple_Head.svg')] bg-cover shadow">
      <div className="flex h-12 items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0 mx-3">
            <img className="h-6" src="imgs/GameBake_Logo.svg" alt="GameBake" />
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
              {location.pathname === "/documentation" && (
                <Menu as="div" className="mr-6">
                  <div>
                    <Menu.Button className="text-white py-2 rounded-md text-sm font-medium">
                      <span className="flex items-center">
                        &nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select a
                        channel&nbsp;&nbsp;&nbsp;&nbsp;
                        <svg
                          className="h-4 w-4 text-[#e4bff8]"
                          fill="currentColor"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path fill="none" d="M0 0h24v24H0z" />{" "}
                          <path
                            d="M18 15l-6-6l-6 6h12"
                            transform="rotate(180 12 12)"
                          />
                        </svg>
                      </span>
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
                    <Menu.Items className="absolute left-50 z-10 h-3/4 origin-top-right rounded-lg bg-white py-4 px-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="overflow-y-auto h-full px-5">
                        {channels.map((channel, i) => (
                          <>
                            <Menu.Item key={"channel" + i}>
                              <Link
                                to="/documentation"
                                className="block px-4 py-1 text-sm text-gray-700 hover:no-underline hover:text-gray-700 focus:no-underline focus:text-gray-700"
                              >
                                <img
                                  className="h-12"
                                  src={"imgs/" + channel}
                                  alt="GameBake"
                                />
                              </Link>
                            </Menu.Item>
                            <hr />
                          </>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center text-white">
            |
            <Menu as="div" className="px-16">
              <div>
                <Menu.Button className="py-2 rounded-md text-sm font-medium">
                  <span>Account</span>
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
                <Menu.Items className="text-center absolute right-16 z-10 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item key="profile">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:no-underline hover:text-gray-700 focus:no-underline focus:text-gray-700"
                    >
                      My Profile
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="documentation">
                    <Link
                      to="/documentation"
                      className="block px-4 py-2 text-sm text-gray-700 hover:no-underline hover:text-gray-700 focus:no-underline focus:text-gray-700"
                    >
                      Docs
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
