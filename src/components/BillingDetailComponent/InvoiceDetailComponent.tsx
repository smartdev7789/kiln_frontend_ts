import React from "react";

interface IProps {
  invoiceId: string;
}

const data = [
  {
    game: "Square Bid",
    channel: "Huawei AppGallery",
    channel_type: "App Store (APK)",
    revenue_share: "50%",
    calculated_revenue: "$10,902.46",
    billable_amount: "$5,451.23",
    taxes_vat: "Zero Rated",
  },
  {
    game: "Square Bid",
    channel: "Huawei AppGallery",
    channel_type: "App Store (APK)",
    revenue_share: "50%",
    calculated_revenue: "$10,902.46",
    billable_amount: "$5,451.23",
    taxes_vat: "Zero Rated",
  },
  {
    game: "Square Bid",
    channel: "Huawei AppGallery",
    channel_type: "App Store (APK)",
    revenue_share: "50%",
    calculated_revenue: "$10,902.46",
    billable_amount: "$5,451.23",
    taxes_vat: "Zero Rated",
  },
  {
    game: "Square Bid",
    channel: "Huawei AppGallery",
    channel_type: "App Store (APK)",
    revenue_share: "50%",
    calculated_revenue: "$10,902.46",
    billable_amount: "$5,451.23",
    taxes_vat: "Zero Rated",
  },
  {
    game: "Square Bid",
    channel: "Huawei AppGallery",
    channel_type: "App Store (APK)",
    revenue_share: "50%",
    calculated_revenue: "$10,902.46",
    billable_amount: "$5,451.23",
    taxes_vat: "Zero Rated",
  },
];

const InvoiceDetailComponent: React.FC<IProps> = ({ invoiceId }) => {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <p className="text-2xl text-[#707070]">{invoiceId}</p>
          <p className="text-xs text-[#707070]">
            <span className="text-[0.8rem]">Billing Period - </span>01/10/22 -
            31/10/22
          </p>
        </div>
        <div>
        <button className="text-white bg-[#ff9100] hover:bg-[#ee8000] rounded-sm px-6 py-[0.2rem] mr-4">
          Download PDF
        </button>
        </div>
      </div>
      <div className="my-3 overflow-x-auto relative border border-gray-100 bg-white rounded-xl shadow-2xl">
        <table className="w-full text-left text-[#707070]">
          <thead className="text-xs bg-white">
            <tr className="border-b">
              <th scope="col" className="font-medium py-6 px-14 w-1/5">
                Game
              </th>
              <th scope="col" className="font-medium py-5 px-6">
                Channel
              </th>
              <th scope="col" className="font-medium py-5 px-6">
                Channel Type
              </th>
              <th scope="col" className="font-medium py-5 px-6">
                Revenue Share
              </th>
              <th scope="col" className="font-medium py-5 px-6">
                Calculated Revenue
              </th>
              <th scope="col" className="font-medium py-5 px-6">
                Billable Amount
              </th>
              <th scope="col" className="font-medium py-5 px-16">
                Taxes/VAT
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {data.map((item) => (
              <tr className="bg-white border-b border-gray-50 text-[0.7rem]">
                <td className="py-3 pl-14">{item.game}</td>
                <td className="py-3 px-6">{item.channel}</td>
                <td className="py-3 px-6">{item.channel_type}</td>
                <td className="py-6 px-6">{item.revenue_share}</td>
                <td className="py-6 px-6">{item.calculated_revenue}</td>
                <td className="py-6 px-6">{item.billable_amount}</td>
                <td className="py-6 pl-16">{item.taxes_vat}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-8">
          <hr className="border-[#B0B0B0]" />
          <div className="flex justify-between">
            <div className="p-8">
              <p className="text-xl text-[#707070]">
                Please approve by November 14th 2022
              </p>
              <p className="text-xs text-[#707070] mt-1">
                If not manually approved by November 14th 2022, automatic
                approval shall be granted as per our ToS.
              </p>
            </div>
            <div className="py-2 text-sm w-[18.7rem]">
              <table className="w-full">
                <tr>
                  <td className="w-48 py-1">Calculated Revenue</td>
                  <td>$54,512.30</td>
                </tr>
                <tr>
                  <td className="w-48 py-1">Billable Amount</td>
                  <td>$27,256.15</td>
                </tr>
                <tr>
                  <td className="w-48 py-1">Taxes/VAT</td>
                  <td>$0.00</td>
                </tr>
              </table>
              <hr className="border-[#B0B0B0] -ml-6 mt-1" />
              <hr className="border-[#B0B0B0] -ml-6 mt-[0.1rem]" />
              <div className="flex w-full text-base py-3">
                <div className="w-48">Total</div>
                <div>$27,256.15</div>
              </div>
              <div className="text-base mb-5">
                <button className="text-white bg-[#ff9100] hover:bg-[#ee8000] rounded-sm px-6 py-[0.2rem] mr-8">
                  Approve
                </button>
                <button
                  type="button"
                  className="text-[#707070] bg-white hover:bg-gray-100 border border-gray-300 px-6 py-[0.2rem]"
                >
                  Issues?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 mb-6 p-4 overflow-x-auto relative border border-gray-100 bg-white rounded-xl shadow-2xl">
      <p className="text-xl text-[#707070]">
      Please share your concerns
              </p>
      </div>
    </>
  );
};

export default InvoiceDetailComponent;
