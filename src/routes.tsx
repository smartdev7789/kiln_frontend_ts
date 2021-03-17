import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Placeholder } from "semantic-ui-react";
import { LogOut } from "./components/LogOut";
import { Analytics } from "./pages/Analytics/Analytics";
import { Games } from "./pages/Games/Games";
import { LogIn } from "./pages/LogIn/LogIn";

export interface RouteConfig {
  path: string;
  key: string;
  text: string;
  exact?: boolean;
  component: React.ComponentType<{ routes?: RouteConfig[] } | any>;
  routes?: RouteConfig[];
  hideInMenu?: boolean;
  floatRight?: boolean;
}

export const RouteWithSubRoutes = (route: RouteConfig) => (
  <Suspense fallback={<Placeholder></Placeholder>}>
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  </Suspense>
);

export const RenderRoutes = ({ routes }: { routes: RouteConfig[] }) => (
  <Switch>
    {routes.map((route, i) => {
      return <RouteWithSubRoutes {...route} />;
    })}
    <Route component={() => <h1>404</h1>} />
  </Switch>
);

export enum Paths {
  Root = "/",
  LogIn = "/login",
  Analytics = "/analytics",
  Account = "/account",
  Games = "/games",
  NewGame = "/games/new",
}

export const ROUTES: RouteConfig[] = [
  {
    path: Paths.Root,
    key: "ROOT",
    hideInMenu: true,
    text: "root.title",
    exact: true,
    component: () => <h1>Log in</h1>,
  },
  {
    path: Paths.LogIn,
    key: "LOG_IN",
    hideInMenu: true,
    exact: true,
    component: LogIn,
    text: "login.title",
  },
  {
    path: Paths.Analytics,
    key: "ANALYTICS",
    exact: true,
    component: Analytics,
    text: "analytics.title",
  },
  {
    path: Paths.Games,
    key: "GAMES",
    exact: true,
    component: Games,
    text: "games.title",
  },
  {
    path: Paths.Account,
    key: "ACCOUNT",
    component: RenderRoutes,
    text: "account.title",
    floatRight: true,
    routes: [
      {
        path: `${Paths.Account}/settings`,
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>Account Settings</h1>,
        text: "accountSettings.title",
      },
      {
        path: `${Paths.Account}/logout`,
        key: "LOGOUT",
        exact: true,
        component: LogOut,
        text: "logout.title",
      },
    ],
  },
];
