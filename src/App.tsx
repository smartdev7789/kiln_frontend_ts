import React, { Suspense, useEffect, useReducer, useState } from "react";
import "./App.css";
import { Paths, PublicPaths, RenderRoutes, ROUTES } from "./routes";
import { Action, ActionType, initialState, State } from "./state/types";
import { reducer } from "./state/reducer";
import { Authentication, getToken } from "./authentication/Authentication";
import { useLocation, useNavigate } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import "tailwindcss/tailwind.css";
import LoadingComponent from "./components/LoadingComponent";
import { ToastContainer } from "react-toastify";

// @ts-ignore

export const DispatchContext: React.Context<{
  state: State;
  dispatch: React.Dispatch<Action>;
}> = React.createContext(null);

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>();
  const [state, dispatch]: [State, React.Dispatch<Action>] = useReducer(
    reducer,
    initialState
  );

  // Get and set context (platforms, apps and releases).
  // Only if user is login
  useEffect(() => {
    if (token) {
      // Local storage.
      const account = JSON.parse(localStorage.getItem("kiln-account") || "{}");

      // Set Context Account
      dispatch({
        type: ActionType.SetAccount,
        payload: { account },
      });

      // Set Context platforms
      // API.platforms(token).then((data: any) => {
      //   const platforms: [] = data._items.map((p: Platform) => {
      //     return p as Platform;
      //   });
      //   dispatch({
      //     type: ActionType.SetPlatforms,
      //     payload: { platforms },
      //   });
      // });

      // // Set Context Apps/games
      // API.apps(token).then((apps) => {
      //   dispatch({
      //     type: ActionType.SetApps,
      //     payload: {
      //       apps: apps._items,
      //     },
      //   });
      // });
    }
  }, [token]);

  // Try to redirect user login to Analytics
  useEffect(() => {
    Authentication.validateToken()
      .then((response) => {
        setToken(getToken());
        if (
          location.pathname === Paths.LogIn ||
          location.pathname === Paths.LogInAgain ||
          location.pathname === Paths.Forgotemail ||
          location.pathname === Paths.Forgotpassword ||
          location.pathname === Paths.Root
        ) {
          navigate(Paths.Dashboard);
        }
      })
      .catch(() => {
        if (
          location.pathname !== Paths.LogIn &&
          location.pathname !== Paths.LogInAgain &&
          location.pathname !== Paths.Forgotemail &&
          location.pathname !== Paths.Forgotpassword &&
          location.pathname !== Paths.Root
        ) {
          navigate(Paths.LogIn);
        }
      });
  }, [navigate, location]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <DispatchContext.Provider value={{ state, dispatch }}>
        <RenderRoutes routes={ROUTES} />
        <LoadingComponent />
        <ToastContainer />
      </DispatchContext.Provider>
    </Suspense>
  );
};

export default App;
