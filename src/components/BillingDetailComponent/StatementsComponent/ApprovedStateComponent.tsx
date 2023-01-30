import React from "react";
import { Statement } from "../../../api/DataTypes";

interface Props {
  statement: Statement;
}

export const ApprovedStateComponent: React.FC<Props> = ({ statement }) => {
  const onDownload = (url: string) => {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = url + ".pdf";
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
            onClick={() => onDownload(statement.statement_file.file)}
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
            <img className="h-4 mr-2" src="imgs/ICON_Paid.svg" alt="GameBake" />
            <div className="font-semibold text-black">Approved</div>
          </div>
        </div>
      </td>
      <td className="py-6 pl-6">{`${statement.period_start} - ${statement.period_end}`}</td>
      <td className="h-full">
        <div className="flex items-center gap-3">
          <div className="w-5/12">{statement.invoice?.name}</div>
          <button
            onClick={() => onDownload(statement.invoice?.invoice_file.file!)}
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
              className="h-5 mr-2"
              src="imgs/ICON_process.svg"
              alt="GameBake"
            />
            <div className="font-semibold text-black">Processing</div>
          </div>
        </div>
      </td>
      <td className="pl-6 h-full">
        {statement.self_billing_invoice !== null && (
          <div className="flex items-center gap-3">
          <div className="w-5/12">{statement.self_billing_invoice?.name}</div>
            <button
              onClick={() =>
                onDownload(statement.self_billing_invoice?.invoice_file.file!)
              }
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
                src="imgs/ICON_Paid.svg"
                alt="GameBake"
              />
              <div className="font-semibold text-black">Paid</div>
            </div>
          </div>
        )}
      </td>
    </>
  );
};
