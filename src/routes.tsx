import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Path } from "path-parser";
import { Placeholder } from "semantic-ui-react";
import { SecurityCheck } from "./pages/SecurityCheck/SecurityCheck";
import { Analytics } from "./pages/Analytics/Analytics";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { Games } from "./pages/Games/Games";
import { LogOut } from "./components/LogOut";
import { LogIn } from "./pages/LogIn/LogIn";
import { NewGame } from "./pages/NewGame/NewGame";
import { TermsOfService } from "./pages/TermsOfService/TermsOfService";
import { EditGamePlatforms } from "./pages/EditGamePlatforms/EditGamePlatforms";
import { EditGameInfo } from "./pages/EditGameInfo/EditGameInfo";
import { EditGameMonetisation } from "./pages/EditGameMonetisation/EditGameMonetisation";
import { EditGameLeaderboards } from "./pages/EditGameLeaderboards/EditGameLeaderboards";
import { EditGameReleases } from "./pages/EditGameReleases/EditGameReleases";
import { Platforms } from "./pages/Platforms/Platforms";
import { EditAccountInfo } from "./pages/EditAccountInfo/EditAccountInfo";
import { Documentation } from "./pages/Documentation/Documentation";

export interface RouteConfig {
  path: string;
  text?: string;
  exact?: boolean;
  public?: boolean;
  component: React.ComponentType<{ routes?: RouteConfig[] } | any>;
  routes?: RouteConfig[];
  hideInMenu?: boolean;
  floatRight?: boolean;
  external?: boolean;
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
  SecurityCheck = "/security-check",
  Analytics = "/analytics",
  Account = "/account",
  Games = "/games",
  Platforms = "/platforms",
  NewGame = "/games/new",
  EditGamePlatforms = "/games/:id/edit/platforms",
  EditGameInfo = "/games/:id/edit/info",
  EditGameMonetisation = "/games/:id/edit/monetisation",
  EditGameLeaderboards = "/games/:id/edit/leaderboards",
  EditGameReleases = "/games/:id/edit/releases",
  ForgotPassword = `/account/forgot-password`,
  ResetPassword = `/account/reset-password`,
  TermsOfService = `/account/terms`,
  AccountSettings = `/account/settings`,
  EditAccountInfo = `/account/edit`,
  LogOut = `/account/logout`,
  Documentation = `/documentation`,
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
  EditGameLeaderboards: createPathHelper(Paths.EditGameLeaderboards),
  EditGameReleases: createPathHelper(Paths.EditGameReleases),
  Analytics: (app_id: string) => `${Paths.Analytics}?app_id=${app_id}`,
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
    path: Paths.SecurityCheck,
    hideInMenu: true,
    public: false,
    exact: true,
    component: SecurityCheck,
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
    path: "https://gamebake.github.io/kiln-unity/",
    external: true,
    component: Documentation,
    text: "documentation.title",
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
    path: Paths.EditGameLeaderboards,
    exact: true,
    hideInMenu: true,
    component: EditGameLeaderboards,
  },
  {
    path: Paths.EditGameReleases,
    exact: true,
    hideInMenu: true,
    component: EditGameReleases,
  },
  {
    path: Paths.Account,
    component: RenderRoutes,
    text: "account.title",
    floatRight: true,
    routes: [
      {
        path: Paths.EditAccountInfo,
        exact: true,
        component: EditAccountInfo,
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
        path: Paths.ResetPassword,
        exact: true,
        public: true,
        hideInMenu: true,
        component: ResetPassword,
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
