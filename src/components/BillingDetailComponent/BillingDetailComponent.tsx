import React, { useContext, useEffect, useState } from "react";
import { API } from "../../api/API";

import { DispatchContext } from "../../App";
import { getToken } from "../../authentication/Authentication";
import { useLoaderOverlay } from "../../hooks/useLoaderOverlay";
import { ActionType } from "../../state/types";
import AddCardComponent from "./AddCardComponent";
import InvoiceComponent from "./InvoiceComponent";

const BillingDetailComponent = () => {
  const { state, dispatch } = useContext(DispatchContext);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const getCardDetails = async () => {
    setWaitingForResponse(true);

    const token: string | null = getToken();
    const card: any = await API.getCardDetails(token);
    dispatch({
      type: ActionType.SetCard,
      payload: { card },
    });
    
    setWaitingForResponse(false);
  };

  useEffect(() => {
    if (!state.card) {
      getCardDetails();
    }
  }, []);

  useLoaderOverlay(waitingForResponse);

  return (
    <>
      <AddCardComponent />
      {state.card && state.card.brand !== null && <InvoiceComponent />}
    </>
  );
};

export default BillingDetailComponent;
