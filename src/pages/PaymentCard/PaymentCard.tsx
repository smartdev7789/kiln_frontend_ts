import React from "react";
import MainLayout from "../../layouts/MainLayout";

const PaymentCard = () => {
  return (
    <MainLayout>
      <div className="container flex justify-center">
        <div className="mt-24 w-3/5 text-center">
          <p className="text-2xl text-[#707070] opacity-[0.6499999761581421]">
            PLEASE ADD A PAYMENT CARD
          </p>
          <p className="mt-2 text-lg text-[#707070] opacity-[0.6499999761581421]">
            A payment card is required before getting started. Please add a
            payment method by{" "}
            <a href="#" className="underline">
              clicking here.
            </a>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentCard;
