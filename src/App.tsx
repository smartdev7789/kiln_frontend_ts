import React, { Suspense, useEffect, useReducer, useState } from "react";
import "./App.css";
import { Container, Placeholder } from "semantic-ui-react";
import { Paths, PublicPaths, RenderRoutes, ROUTES } from "./routes";
import { Action, ActionType, initialState, State } from "./state/types";
import { reducer } from "./state/reducer";
import { Menu } from "./components/Menu/Menu";
import { Authentication, getToken } from "./authentication/Authentication";
import { RouteComponentProps } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { API } from "./api/API";
import { Platform } from "./api/DataTypes";

// @ts-ignore
export const DispatchContext: React.Context<{
  state: State;
  dispatch: React.Dispatch<Action>;
}> = React.createContext(null);

export const App = (props: RouteComponentProps) => {
  const { history, location } = props;
  const [token, setToken ] = useState<string | null>();
  const [state, dispatch]: [State, React.Dispatch<Action>] = useReducer(
    reducer,
    initialState
  );

  
  // Get and set context (platforms, apps and releases).
  // Only if user is login
  useEffect( () => {
    if ( token ) {

      // Local storage.
      const account = JSON.parse( localStorage.getItem('kiln-account') || '{}' );
      
      // Set Context Account
      dispatch({
        type: ActionType.SetAccount,
        payload: { account },
      })

      // Set Context platforms
      API.platforms(token).then( ( data:any ) => {
        const platforms:[] = data._items.map( ( p:Platform ) => { return (p as Platform) })
        dispatch({
          type: ActionType.SetPlatforms,
          payload: { platforms },
        });
      });
    
      // Set Context Apps/games
      API.apps(token).then((apps) => {
        dispatch({
          type: ActionType.SetApps,
          payload: {
            apps: apps._items,
          },
        });
      });

    }
    
  }, [token] );

  // Try to redirect user login to Analytics
  useEffect(() => {
    
    // console.log(location.pathname);
    
    if (!PublicPaths.includes(location.pathname)) {
      // console.log("Private page")
      
      Authentication.validateToken()
        .then((user) => {
          setToken( getToken() );
          dispatch({
            type: ActionType.SetUser,
            payload: {
              user,
            },
          });

          if ( location.pathname === Paths.LogIn || location.pathname === Paths.Root ) {
            history.push(Paths.Analytics);
          }
        })
        .catch(() => {
          if (location.pathname !== Paths.LogIn) history.push(Paths.LogIn);
        });
    }
  }, [history, location] );

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
