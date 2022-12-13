import React from "react";
interface Props {
  games: Record<string, string>[];
  channels: Record<string, string>[];
}

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

const OverviewTableComponent = ({ games, channels }: Props) => {
  return (
    <div className="overflow-x-auto relative border border-gray-100 bg-white rounded-xl shadow-2xl">
      <table className="w-full text-left text-[#707070]">
        <thead className="text-xs bg-white">
          <tr className="border-b">
            <th className="font-medium text-base py-4 px-5">
              {games.length > 0 ? "Games" : "Channels"}
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
            <tr
              key={idx}
              className="bg-white border-b border-gray-100"
            >
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
            <tr
              key={idx}
              className="bg-white border-b border-gray-100"
            >
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
