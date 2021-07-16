import { useContext, useEffect } from "react";
import { DispatchContext } from "../App";
import { Authentication } from "../authentication/Authentication";
import { ActionType } from "../state/types";

export const LogOut = () => {
  const { dispatch } = useContext(DispatchContext);

  useEffect(() => {
    dispatch({
      type: ActionType.SetAccount,
      payload: {
        account: undefined,
      },
    });
  }, [dispatch]);

  Authentication.logOut();

  return null;
};
