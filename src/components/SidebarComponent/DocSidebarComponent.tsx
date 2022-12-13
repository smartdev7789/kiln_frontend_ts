import React from "react";

interface Props {
  orders: Record<string, string>[];
  selected: string;
  onClick: (arg: string) => void;
}

const DocSidebarComponent: React.FC<Props> = ({
  orders,
  selected,
  onClick,
}) => {
  return (
    <div className="shadow-sm h-full bg-white">
      <div className="text-center">
        <input
          name="search"
          className="bg-gray150 text-gray-900 placeholder-gray-600 inline-flex relative items-center my-3 py-1 rounded-lg text-center"
          placeholder="Search"
        />
      </div>
      <button
        type="button"
        className={
          "relative items-center py-3 px-3 w-full text-sm bg-[#f7f7f7] hover:bg-gray-100"
        }
      >
        <div className="flex justify-between items-center">
          <div className="text-base font-medium">Getting Started</div>
          <div>
            <svg
              className="h-4 w-4 text-black"
              fill="currentColor"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path fill="none" d="M0 0h24v24H0z" />{" "}
              <path d="M18 15l-6-6l-6 6h12" transform="rotate(180 12 12)" />
            </svg>
          </div>
        </div>
      </button>
      {orders.map((order) => (
        <button
          type="button"
          className={
            "inline-flex relative items-center py-1 pl-6 w-full text-sm hover:bg-gray-100 " +
            (selected === order.name ? "bg-[#f7f7f7]" : "bg-white")
          }
          onClick={() => onClick(order.name)}
        >
          {order.title}
        </button>
      ))}
    </div>
  );
};

export default DocSidebarComponent;
