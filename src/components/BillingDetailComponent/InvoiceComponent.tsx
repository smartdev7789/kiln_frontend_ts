import React, { useContext, useEffect, useState } from "react";
import { API } from "../../api/API";
import { Statement } from "../../api/DataTypes";
import { DispatchContext } from "../../App";
import { getToken } from "../../authentication/Authentication";
import { useLoaderOverlay } from "../../hooks/useLoaderOverlay";
import {
  ApprovedStateComponent,
  RejectedStateComponent,
  RequiresApprovalStateComponent,
} from "./StatementsComponent";

const InvoiceComponent = () => {
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [statements, setStatements] = useState<Statement[]>([]);

  const getStatements = async () => {
    setWaitingForResponse(true);

    const token: string | null = getToken();
    const data = await API.getStatements(token);
    setStatements([...(data._items as Statement[])]);
    setWaitingForResponse(false);
  };

  useEffect(() => {
    getStatements();
  }, []);

  useLoaderOverlay(waitingForResponse);

  return (
    <>
      <div className="text-2xl text-[#707070] mt-10">
        Statements and Invoices
      </div>
      <div className="text-lg text-[#707070] font-light">
        Monthly charges and income reports
      </div>
      <div className="my-2 overflow-x-auto relative border border-gray-100 bg-white rounded-xl shadow-2xl">
        <table className="w-full text-left text-[#707070]">
          <thead className="text-xs bg-white">
            <tr className="border-b">
              <th scope="col" className="py-6 pl-10 w-4/12">
                Statement
              </th>
              <th scope="col" className="py-5 pl-6 w-2/12">
                Billing Period
              </th>
              <th scope="col" className="py-5 w-3/12">
                GameBake Invoice
              </th>
              <th scope="col" className="py-5 pl-6 w-3/12">
                Self-billing Invoice
              </th>
            </tr>
          </thead>
          <tbody className="text-[0.7em]">
            {statements.map((statement) => (
              <tr key={statement.id} className="bg-white border-b border-gray-100">
                {statement.status === "approved" && (
                  <ApprovedStateComponent statement={statement} />
                )}
                {statement.status === "rejected" && (
                  <RejectedStateComponent statement={statement} />
                )}
                {statement.status === "requires_approval" && (
                  <RequiresApprovalStateComponent
                    statement={statement}
                    getStatements={getStatements}
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InvoiceComponent;
