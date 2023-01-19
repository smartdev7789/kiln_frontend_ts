import React, { useContext, useEffect, useState } from "react";
import { API } from "../../api/API";
import { DispatchContext } from "../../App";
import { getToken } from "../../authentication/Authentication";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import StripeFormComponent from "./StripeFormComponent";
import { Billing } from "../../api/DataTypes";
import { useNotify } from "../../hooks/useNotify";

interface IOption {
  clientSecret: string;
}

const AddCardComponent = () => {
  const { state } = useContext(DispatchContext);
  const token: string | null = getToken();
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
  const [options, setOptions] = useState<IOption>();
  const [loaded, setLoaded] = useState(false);
  const { notifyError } = useNotify();

  const onAddCard = async (e: any) => {
    e.preventDefault();
    const response: any = await API.createCardDetails(token);

    if (response._error) {
      notifyError(response._error?.message);
    } else {
      setStripePromise(loadStripe(response.stripe_public_key));
      setOptions({ clientSecret: response.client_secret });
      setLoaded(true);
    }
  };

  return (
    <>
      <div className="text-2xl text-[#707070] flex items-center mb-6">
        Billing Details
        {state.card && state.card.brand === null && (
          <button
            onClick={onAddCard}
            className="text-base text-white bg-[#ff9100] hover:bg-[#ee8000] rounded-sm px-5 pb-[0.1rem] pt-[0.2rem] ml-6"
          >
            Add Card
          </button>
        )}
      </div>

      {loaded && (
        <Elements stripe={stripePromise!} options={options}>
          <StripeFormComponent />
        </Elements>
      )}

      {state.card && state.card.brand !== null && (
        <div className="block mb-2 px-6 py-6 w-1/4 bg-white rounded-lg text-[#707070] text-sm shadow-2xl">
          <div className="text-base font-medium">Connected Card</div>
          <div className="pl-3">
            <img className="h-24" src={`imgs/${state.card.brand}.svg`} />
            <div className="pl-2">
              <div>Name: MY COMPANY LTD</div>
              <div>
                Expiry: {`${state.card.exp_month}/${state.card.exp_year}`}
              </div>
              <div>Card Number: **** **** **** {state.card.last4}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCardComponent;
