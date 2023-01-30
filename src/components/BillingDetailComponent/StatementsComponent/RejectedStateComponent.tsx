import React from "react";
import { Statement } from "../../../api/DataTypes";

interface Props {
  statement: Statement;
}

export const RejectedStateComponent: React.FC<Props> = ({ statement }) => {
  const onDownloadStatement = () => {
    fetch(statement.statement_file.file).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = statement.statement_file.file + ".pdf";
        alink.click();
      });
    });
  };

  return (
    <>
      <td className="pl-10">
        <div className="flex items-center gap-3">
          {statement.name}
          <button
            onClick={onDownloadStatement}
            className="text-[#707070] bg-white hover:bg-gray-100 rounded-md py-1"
          >
            <div className="flex">
              <img
                className="h-5 mr-2"
                src="imgs/cloud-computing.svg"
                alt="GameBake"
              />
              Download
            </div>
          </button>
          <div className="flex">
            <img
              className="h-4 mr-2"
              src="imgs/ICON_issue.svg"
              alt="GameBake"
            />
            <div className="font-semibold text-black">Rejected</div>
          </div>
        </div>
      </td>
      <td className="pl-6 py-6">{`${statement.period_start} - ${statement.period_end}`}</td>
      <td />
      <td />
    </>
  );
};
