import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Placeholder } from "semantic-ui-react";
import { LogOut } from "./components/LogOut";
import { Analytics } from "./pages/Analytics/Analytics";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { Games } from "./pages/Games/Games";
import { LogIn } from "./pages/LogIn/LogIn";
import { TermsOfService } from "./pages/TermsOfService/TermsOfService";

export interface RouteConfig {
  path: string;
  key: string;
  text: string;
  exact?: boolean;
  public?: boolean;
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
  ForgotPassword = `/account/forgot-password`,
  TermsOfService = `/account/terms`,
  AccountSettings = `/account/settings`,
  LogOut = `/account/logout`,
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
    public: true,
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
        path: Paths.AccountSettings,
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>Account Settings</h1>,
        text: "accountSettings.title",
      },
      {
        path: Paths.LogOut,
        key: "LOGOUT",
        exact: true,
        component: LogOut,
        text: "logout.title",
      },
      {
        path: Paths.ForgotPassword,
        key: "FORGOT_PASSWORD",
        exact: true,
        public: true,
        hideInMenu: true,
        component: ForgotPassword,
        text: "forgotPassword.title",
      },
      {
        path: Paths.TermsOfService,
        key: "TERMS_OF_SERVICE",
        exact: true,
        hideInMenu: true,
        component: TermsOfService,
        text: "termsOfService.title",
      },
    ],
  },
];

const FlatRoutes = [...ROUTES].concat(
  ...ROUTES.filter((route) => route.routes)
    .map((route) => route.routes!)
    .flat()
);

export const PublicPaths = FlatRoutes.filter((route) => route.public).map(
  (route) => route.path
);
