import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../App";
import { Authentication } from "../authentication/Authentication";
import { ActionType } from "../state/types";

export const LogOut = () => {
  const { dispatch } = useContext(DispatchContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: ActionType.SetAccount,
      payload: {
        account: undefined,
      },
    });
    navigate("/login");
  }, [dispatch]);

  Authentication.logOut();
  return null;
};
