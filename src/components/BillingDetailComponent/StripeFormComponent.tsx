import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useContext } from "react";
import { API } from "../../api/API";
import { DispatchContext } from "../../App";
import { getToken } from "../../authentication/Authentication";
import { useNotify } from "../../hooks/useNotify";
import { ActionType } from "../../state/types";

const StripeFormComponent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { notifySuccess, notifyError } = useNotify();
  const { state, dispatch } = useContext(DispatchContext);

  const getCardDetails = async () => {
    const token: string | null = getToken();
    const card: any = await API.getCardDetails(token);
    dispatch({
      type: ActionType.SetCard,
      payload: { card },
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: "https://example.com/account/payments/setup-complete",
      },
    });

    if (error) {
      notifyError(error.message!);
    } else {
      getCardDetails();
      notifySuccess("Card Added Successfully");
    }
  };

  return (
    <div className="w-3/5">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          disabled={!stripe}
          className="text-white bg-[#ff9100] hover:bg-[#ee8000] rounded-sm px-10 py-[0.35rem] mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StripeFormComponent;
