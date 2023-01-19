import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useNotify } from "../../hooks/useNotify";

const StripeFormComponent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { notifySuccess, notifyError } = useNotify();

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
