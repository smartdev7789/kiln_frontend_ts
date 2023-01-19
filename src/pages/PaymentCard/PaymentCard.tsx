import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

const PaymentCard = () => {
  return (
    <MainLayout>
      <div className="container flex justify-center">
        <div className="mt-24 w-3/5 text-center">
          <p className="text-2xl text-[#707070]">
            PLEASE ADD A PAYMENT CARD
          </p>
          <p className="mt-2 text-lg text-[#707070]">
            A payment card is required before getting started. Please add a
            payment method by{" "}
            <Link to="/profile" className="underline">
              clicking here.
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentCard;
