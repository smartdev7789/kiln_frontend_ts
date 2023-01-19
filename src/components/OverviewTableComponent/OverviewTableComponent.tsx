import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
interface Props {
  games: Record<string, string>[];
  channels: Record<string, string>[];
}

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

const OverviewTableComponent = ({ games, channels }: Props) => {
  return (
    <div className="relative border border-gray-100 bg-white rounded-lg shadow-2xl">
      <table className="w-full text-left text-[#707070]">
        <thead className="text-xs bg-white">
          <tr className="border-b">
            <th className="font-medium text-base py-4 px-5 w-full" colSpan={7}>
              <div className="flex justify-between items-center">
                <div>{games.length > 0 ? "Games Overview" : "Channels"}</div>

                <Menu as="div" className="mr-6">
                  <div>
                    <Menu.Button className="py-2 rounded-lg text-sm font-medium">
                      <span className="flex items-center">
                        {games.length > 0
                          ? "Select a game"
                          : "Select a Channel"}
                        <img
                          className="ml-2"
                          src="imgs/dropdown_arrow1.svg"
                          alt="GameBake"
                        />
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
                    <Menu.Items className="absolute z-10 w-80 -ml-20 origin-top-right rounded-lg bg-white py-4 px-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="overflow-y-auto h-full px-5">
                        {games.length > 0
                          ? games.map((game, i) => (
                              <>
                                <Menu.Item key={"game" + i}>
                                  <Link
                                    to="/games"
                                    className="block py-1 text-sm text-gray-700 hover:bg-gray-100 hover:no-underline hover:text-gray-700 focus:no-underline focus:text-gray-700"
                                  >
                                    <div className="flex items-center">
                                      <img
                                        className="h-12 mr-2"
                                        src={`${API_ADDRESS}/assets/${game.name}.png`}
                                        alt="GameBake"
                                      />
                                      {game.name}
                                    </div>
                                  </Link>
                                </Menu.Item>
                                <hr />
                              </>
                            ))
                          : channels.map((channel, i) => (
                              <>
                                <Menu.Item key={"channel" + i}>
                                  <Link
                                    to="/games"
                                    className="block py-1 text-sm text-gray-700 hover:bg-gray-100 hover:no-underline hover:text-gray-700 focus:no-underline focus:text-gray-700"
                                  >
                                    <div className="flex items-center">
                                      <img
                                        className="h-12 mr-2"
                                        src={`${API_ADDRESS}/assets/${channel.icon}`}
                                        alt="GameBake"
                                      />
                                      {channel.name}
                                    </div>
                                  </Link>
                                </Menu.Item>
                                <hr />
                              </>
                            ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </th>
          </tr>
          <tr className="border-b">
            <th scope="col" className="font-medium py-5 px-8 w-1/6">
              {games.length > 0 ? "Live Channels" : "Live Games"}
            </th>
            <th scope="col" className="font-medium py-5 px-6 w-1/4">
              {games.length > 0 ? "Game" : "Channel"}
            </th>
            <th scope="col" className="font-medium py-5 px-6">
              Revenue
            </th>
            <th scope="col" className="font-medium py-5 px-6">
              DAU
            </th>
            <th scope="col" className="font-medium py-5 px-6">
              New Users
            </th>
            <th scope="col" className="font-medium py-5 px-6">
              MAU
            </th>
            <th scope="col" className="font-medium py-5 px-6"></th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {games.map((game, idx) => (
            <tr key={idx} className="bg-white border-b border-gray-100">
              <td className="py-3 px-8">{game.channels}</td>
              <td className="py-3 px-6 flex items-center">
                <img
                  className="h-10 mr-4"
                  src={`${API_ADDRESS}/assets/${game.name}.png`}
                  alt="GameBake"
                />
                {game.name}
              </td>
              <td className="py-3 px-6">{game.revenue}</td>
              <td className="py-3 px-6">{game.dau}</td>
              <td className="py-3 px-6">{game.new_users}</td>
              <td className="py-3 px-6">{game.mau}</td>
              <td className="py-3 px-6">
                <button
                  type="button"
                  className="text-[#707070] text-opacity-[0.6499999761581421] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg px-5 py-1"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
          {channels.map((channel, idx) => (
            <tr key={idx} className="bg-white border-b border-gray-100">
              <td className="py-3 px-8">{channel.games}</td>
              <td className="py-3 px-6 flex items-center">
                <img
                  className="h-10 mr-4"
                  src={`${API_ADDRESS}/assets/${channel.icon}`}
                  alt="GameBake"
                />
                {channel.name}
              </td>
              <td className="py-3 px-6">{channel.revenue}</td>
              <td className="py-3 px-6">{channel.dau}</td>
              <td className="py-3 px-6">{channel.new_users}</td>
              <td className="py-3 px-6">{channel.mau}</td>
              <td className="py-3 px-6">
                <button
                  type="button"
                  className="text-[#707070] text-opacity-[0.6499999761581421] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg px-5 py-1"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverviewTableComponent;
