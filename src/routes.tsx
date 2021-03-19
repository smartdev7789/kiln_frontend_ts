import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Path } from "path-parser";
import { Placeholder } from "semantic-ui-react";
import { LogOut } from "./components/LogOut";
import { Analytics } from "./pages/Analytics/Analytics";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { Games } from "./pages/Games/Games";
import { LogIn } from "./pages/LogIn/LogIn";
import { NewGame } from "./pages/NewGame/NewGame";
import { TermsOfService } from "./pages/TermsOfService/TermsOfService";
import { EditGamePlatforms } from "./pages/EditGamePlatforms/EditGamePlatforms";
import { EditGameInfo } from "./pages/EditGameInfo/EditGameInfo";
import { EditGameMonetisation } from "./pages/EditGameMonetisation/EditGameMonetisation";
import { EditGameAnalytics } from "./pages/EditGameAnalytics/EditGameAnalytics";
import { Platforms } from "./pages/Platforms/Platforms";
import { EditAccountInfo } from "./pages/EditAccountInfo/EditAccountInfo";

export interface RouteConfig {
  path: string;
  text?: string;
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
      return <RouteWithSubRoutes key={route.path} {...route} />;
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
  Platforms = "/platforms",
  NewGame = "/games/new",
  EditGamePlatforms = "/games/:id/edit/platforms",
  EditGameInfo = "/games/:id/edit/info",
  EditGameMonetisation = "/games/:id/edit/monetisation",
  EditGameAnalytics = "/games/:id/edit/analytics",
  ForgotPassword = `/account/forgot-password`,
  TermsOfService = `/account/terms`,
  AccountSettings = `/account/settings`,
  EditAccountInfo = `/account/edit`,
  LogOut = `/account/logout`,
}

const createPathHelper = (path: string) => {
  const pathInstance = new Path(path);

  return (object: object) => {
    return pathInstance.build(object);
  };
};

export const PathHelpers = {
  EditGamePlatforms: createPathHelper(Paths.EditGamePlatforms),
  EditGameInfo: createPathHelper(Paths.EditGameInfo),
  EditGameMonetisation: createPathHelper(Paths.EditGameMonetisation),
  EditGameAnalytics: createPathHelper(Paths.EditGameAnalytics),
};

export const ROUTES: RouteConfig[] = [
  {
    path: Paths.Root,
    hideInMenu: true,
    exact: true,
    component: () => <h1>Log in</h1>,
  },
  {
    path: Paths.LogIn,
    hideInMenu: true,
    public: true,
    exact: true,
    component: LogIn,
  },
  {
    path: Paths.Analytics,
    exact: true,
    component: Analytics,
    text: "analytics.title",
  },
  {
    path: Paths.Games,
    exact: true,
    component: Games,
    text: "games.title",
  },
  {
    path: Paths.Platforms,
    exact: true,
    component: Platforms,
    text: "platforms.title",
  },
  {
    path: Paths.NewGame,
    exact: true,
    hideInMenu: true,
    component: NewGame,
  },
  {
    path: Paths.EditAccountInfo,
    exact: true,
    hideInMenu: true,
    component: EditAccountInfo,
  },
  {
    path: Paths.EditGamePlatforms,
    exact: true,
    hideInMenu: true,
    component: EditGamePlatforms,
  },
  {
    path: Paths.EditGameInfo,
    exact: true,
    hideInMenu: true,
    component: EditGameInfo,
  },
  {
    path: Paths.EditGameMonetisation,
    exact: true,
    hideInMenu: true,
    component: EditGameMonetisation,
  },
  {
    path: Paths.EditGameAnalytics,
    exact: true,
    hideInMenu: true,
    component: EditGameAnalytics,
  },
  {
    path: Paths.Account,
    component: RenderRoutes,
    text: "account.title",
    floatRight: true,
    routes: [
      {
        path: Paths.AccountSettings,
        exact: true,
        component: () => <h1>Account Settings</h1>,
        text: "accountSettings.title",
      },
      {
        path: Paths.LogOut,
        exact: true,
        component: LogOut,
        text: "logout.title",
      },
      {
        path: Paths.ForgotPassword,
        exact: true,
        public: true,
        hideInMenu: true,
        component: ForgotPassword,
      },
      {
        path: Paths.TermsOfService,
        exact: true,
        hideInMenu: true,
        component: TermsOfService,
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
