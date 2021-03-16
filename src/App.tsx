import React, { Suspense, useEffect, useReducer } from "react";
import "./App.css";
import { Container, Placeholder } from "semantic-ui-react";
import { Paths, RenderRoutes, ROUTES } from "./routes";
import { Action, ActionType, initialState, State } from "./state/types";
import { reducer } from "./state/reducer";
import { Menu } from "./components/Menu/Menu";
import { Authentication } from "./authentication/Authentication";
import { RouteComponentProps } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";

// @ts-ignore
export const DispatchContext: React.Context<{
  state: State;
  dispatch: React.Dispatch<Action>;
}> = React.createContext(null);

export const App = (props: RouteComponentProps) => {
  const { history, location } = props;
  const [state, dispatch]: [State, React.Dispatch<Action>] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    Authentication.validateToken()
      .then((user) => {
        dispatch({
          type: ActionType.SET_USER,
          payload: {
            user,
          },
        });

        if (
          location.pathname === Paths.LogIn ||
          location.pathname === Paths.Root
        )
          history.push(Paths.Analytics);
      })
      .catch(() => {});
  }, [history, location]);

  return (
    <Suspense fallback={<Placeholder></Placeholder>}>
      <DispatchContext.Provider value={{ state, dispatch }}>
        {state.user && <Menu {...props} routes={ROUTES} />}
        <Container>
          <RenderRoutes routes={ROUTES} />
        </Container>
        {state.user && <Footer />}
      </DispatchContext.Provider>
    </Suspense>
  );
};

export default App;
