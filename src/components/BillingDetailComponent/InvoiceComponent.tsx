import React from "react";

const InvoiceComponent = () => {
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
          <tbody className="text-xs">
            <tr className="bg-white border-b border-gray-100">
              <td className="pl-10">
                <div className="flex items-center gap-3">
                  10003-11012023
                  <button
                    type="button"
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
                    type="submit"
                    className="text-white bg-[#ff9100] hover:bg-[#ee8000] rounded-sm px-4 py-1"
                  >
                    Approve
                  </button>
                  <button
                    type="submit"
                    className="text-[#707070] bg-white hover:bg-gray-100 border border-gray-300 rounded-sm px-4 py-1"
                  >
                    Reject
                  </button>
                </div>
              </td>
              <td className="py-6 pl-6">01/12/22 - 31/12/22</td>
              <td className="h-full">
                <div className="flex items-center">
                  <img
                    className="h-5 mr-2"
                    src="imgs/ICON_question-m.svg"
                    alt="GameBake"
                  />
                  <div className="font-semibold text-black">
                    Requires Approval
                  </div>
                </div>
              </td>
              <td className="pl-6 h-full">
                <div className="flex items-center">
                  <img
                    className="h-5 mr-2"
                    src="imgs/ICON_question-m.svg"
                    alt="GameBake"
                  />
                  <div className="font-semibold text-black">
                    Requires Approval
                  </div>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b border-gray-100">
              <td className="pl-10">
                <div className="flex items-center gap-3">
                  10003-03122022
                  <button
                    type="button"
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
                    <div className="font-semibold text-black">Approved</div>
                  </div>
                </div>
              </td>
              <td className="py-6 pl-6">01/11/22 - 30/11/22</td>
              <td className="h-full">
                <div className="flex items-center gap-3">
                  B10003-11012023
                  <button
                    type="button"
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
                <div className="flex items-center gap-3">
                  SB10003-11012023
                  <button
                    type="button"
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
              </td>
            </tr>
            <tr className="bg-white border-b border-gray-100">
              <td className="pl-10">
                <div className="flex items-center gap-3">
                  10003-03122022
                  <button
                    type="button"
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
              <td className="pl-6 py-6">01/11/22 - 30/11/22</td>
              <td />
              <td />
            </tr>
            <tr className="bg-white border-b border-gray-100">
              <td className="pl-10">
                <div className="flex items-center gap-3">
                  10003-03112022
                  <button
                    type="button"
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
                    <div className="font-semibold text-black">Approved</div>
                  </div>
                </div>
              </td>
              <td className="pl-6 py-6">01/10/22 - 31/10/22</td>
              <td className="h-full">
                <div className="flex items-center gap-3">
                  B10003-11012023
                  <button
                    type="button"
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
              </td>
              <td className="pl-6 h-full">
                <div className="flex items-center gap-3">
                  SB10003-11012023
                  <button
                    type="button"
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InvoiceComponent;
