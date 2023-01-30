import React, { useState } from "react";
import { API } from "../../../api/API";
import { Statement } from "../../../api/DataTypes";
import { getToken } from "../../../authentication/Authentication";
import { useLoaderOverlay } from "../../../hooks/useLoaderOverlay";
import { useNotify } from "../../../hooks/useNotify";

interface Props {
  statement: Statement;
  getStatements: () => void;
}

export const RequiresApprovalStateComponent: React.FC<Props> = ({
  statement,
  getStatements,
}) => {
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const {notifySuccess, notifyError} = useNotify();

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

  const onApprove = async () => {
    setWaitingForResponse(true);

    const token: string | null = getToken();
    const response = await API.acceptInvoice(token, statement.id);
    if (response._status === "OK") {
      notifySuccess("Accepted Invoice Successfully");
      getStatements();
    } else {
      notifyError(response._error?.message);
    }
    setWaitingForResponse(false);
  }

  const onReject = async () => {
    setWaitingForResponse(true);

    const token: string | null = getToken();
    const response = await API.rejectInvoice(token, statement.id);
    if (response._status === "OK") {
      notifySuccess("Rejected Invoice Successfully");
      getStatements();
    } else {
      notifyError(response._error?.message);
    }
    setWaitingForResponse(false);
  }

  useLoaderOverlay(waitingForResponse);

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
          <button
            onClick={onApprove}
            className="text-white bg-[#ff9100] hover:bg-[#ee8000] rounded-sm px-4 py-1"
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className="text-[#707070] bg-white hover:bg-gray-100 border border-gray-300 rounded-sm px-4 py-1"
          >
            Reject
          </button>
        </div>
      </td>
      <td className="py-6 pl-6">{`${statement.period_start} - ${statement.period_end}`}</td>
      <td className="h-full">
        <div className="flex items-center">
          <img
            className="h-5 mr-2"
            src="imgs/ICON_question-m.svg"
            alt="GameBake"
          />
          <div className="font-semibold text-black">Requires Approval</div>
        </div>
      </td>
      <td className="pl-6 h-full">
        <div className="flex items-center">
          <img
            className="h-5 mr-2"
            src="imgs/ICON_question-m.svg"
            alt="GameBake"
          />
          <div className="font-semibold text-black">Requires Approval</div>
        </div>
      </td>
    </>
  );
};
