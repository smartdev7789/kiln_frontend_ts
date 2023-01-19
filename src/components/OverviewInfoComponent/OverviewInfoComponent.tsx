import React from "react";

interface Props {
  title: string;
  dateType: string;
  value: number;
  profit: string;
}

const OverviewInfoComponent: React.FC<Props> = ({
  title,
  dateType,
  value,
  profit,
}) => {
  const output: any = {
    day: { str1: "(Yesterday)", str2: "(vs. Previous Day)" },
    month: {
      str1: "(Selected Month)",
      str2: "(vs. Previous Month)",
    },
  };
  const profitCol: [string, string] = ["text-[#02bc77]", "text-[#ff2366]"];

  return (
    <div className="block p-6 w-full bg-white rounded-lg shadow-2xl hover:bg-gray-100">
      <span className="text-xl tracking-tight text-[#707070]">
        {title}
      </span>
      <span className="text-xs tracking-tight text-[#707070]">
        &nbsp;{output[dateType].str1}
      </span>
      <p className="mt-6 text-2xl text-black">{value}</p>
      <p
        className={
          "mt-1 text-xs " +
          profitCol[Number(profit) > 0 ? 0 : 1]
        }
      >
        {Number(profit) > 0 ? "+ " : "- "}
        {Math.abs(Number(profit))}% {output[dateType].str2}
      </p>
    </div>
  );
};

export default OverviewInfoComponent;
