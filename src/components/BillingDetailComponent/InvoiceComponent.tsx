import React from "react";

const InvoiceComponent = () => {
  return (
    <>
      <p className="text-2xl text-[#707070] mt-10">Invoices</p>
      <div className="my-6 overflow-x-auto relative border border-gray-100 bg-white rounded-xl shadow-2xl">
        <table className="w-full text-left text-[#707070] dark:text-gray-400">
          <thead className="text-xs bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b">
              <th scope="col" className="font-medium py-6 px-10 w-1/3">
                Invoice
              </th>
              <th scope="col" className="font-bold py-5 px-6">
                Amount
              </th>
              <th scope="col" className="font-medium py-5 px-6">
                Billing Period
              </th>
              <th scope="col" className="font-medium py-5 px-6">
                Status
              </th>
              <th scope="col" className="font-medium py-5 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-xs">
            <tr className="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <td className="py-3 px-10">Invoice-0011012_Nov22</td>
              <td className="py-3 px-6">$5,451.23</td>
              <td className="py-3 px-6">01/10/22 - 31/10/22</td>
              <td className="py-6 px-6 flex items-center h-full">
                <img
                  className="h-4 mr-2"
                  src="imgs/ICON_question-m.svg"
                  alt="GameBake"
                />
                Requires Approval
              </td>
              <td className="py-3 px-6">
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-[#707070] bg-white hover:bg-gray-100 border border-gray-300 rounded-md px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="text-[#707070] bg-white hover:bg-gray-100 border border-gray-300 rounded-md px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Approve
                  </button>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <td className="py-3 px-10">Invoice-0011011_Oct22</td>
              <td className="py-3 px-6">$3,673.67</td>
              <td className="py-3 px-6">01/10/22 - 31/10/22</td>
              <td className="py-6 px-6 flex items-center h-full">
                <img
                  className="h-4 mr-2"
                  src="imgs/ICON_process.svg"
                  alt="GameBake"
                />
                Payment Processing
              </td>
              <td className="py-3 px-6">
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-[#707070] bg-white hover:bg-gray-100 border border-gray-300 rounded-md px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <td className="py-3 px-10">Invoice-0011010_Sep22</td>
              <td className="py-3 px-6">$2,964.23</td>
              <td className="py-3 px-6">01/10/22 - 31/10/22</td>
              <td className="py-6 px-6 flex items-center h-full">
                <img
                  className="h-3 mr-2"
                  src="imgs/ICON_issue.svg"
                  alt="GameBake"
                />
                Payment Failed
              </td>
              <td className="py-3 px-6">
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-[#707070] bg-white hover:bg-gray-100 border border-gray-300 rounded-md px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="text-[#707070] bg-white hover:bg-gray-100 border border-gray-300 rounded-md px-6 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Re-try
                  </button>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <td className="py-3 px-10">Invoice-0011009_Aug22</td>
              <td className="py-3 px-6">$2,563.33</td>
              <td className="py-3 px-6">01/10/22 - 31/10/22</td>
              <td className="py-6 px-6 flex items-center h-full">
                <img
                  className="h-3 mr-2"
                  src="imgs/ICON_Paid.svg"
                  alt="GameBake"
                />
                Paid
              </td>
              <td className="py-3 px-6">
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-[#707070] bg-white hover:bg-gray-100 border border-gray-300 rounded-md px-5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="text-[#707070] bg-white hover:bg-gray-100 rounded-md py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    <div className="flex">
                      <img
                        className="h-4 mr-2"
                        src="imgs/cloud-computing.svg"
                        alt="GameBake"
                      />
                      Download
                    </div>
                  </button>
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
