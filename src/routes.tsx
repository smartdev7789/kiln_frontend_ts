import React from "react";
import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import LogInAgain from "./pages/LoginAgain";
import ForgotEmail from "./pages/ForgotEmail";
import ForgotPassword from "./pages/ForgotPassword";
import PaymentCard from "./pages/PaymentCard";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { LogOut } from "./components/LogOut";
import Games from "./pages/Games";
import Mediation from "./pages/Mediation";
import UserAcquistion from "./pages/UserAcquistion";
import Channels from "./pages/Channels";
import Documentation from "./pages/Documentation";

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
  <Route
    path={route.path}
    element={<route.component routes={route.routes} />}
  />
);

export const RenderRoutes = ({ routes }: { routes: RouteConfig[] }) => (
  <Routes>
    {routes.map((route, i) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component routes={route.routes}  className='text-base md:text-lg lg:text-lg xl:text-xl'/>}
        />
      );
    })}
    <Route element={<h1>404</h1>} />
  </Routes>
);

export enum Paths {
  LogIn = "/login",
  LogInAgain = "/loginagain",
  Dashboard = "/analytics",
  Games = "/games",
  Mediation = "/mediation",
  UserAcquistion = "/user_acquistion",
  Channels = "/channels",
  Paymentcard = "/paymentcard",
  Profile = "/profile",
  Documentation = "/documentation",
  Forgotemail = "/forgotemail",
  Forgotpassword = "/forgotpassword",
  LogOut = "/logout",
}

export const ROUTES: RouteConfig[] = [
  {
    path: Paths.LogIn,
    hideInMenu: true,
    public: true,
    exact: true,
    component: LogIn,
  },
  {
    path: Paths.LogInAgain,
    hideInMenu: true,
    public: true,
    exact: true,
    component: LogInAgain,
  },
  {
    path: Paths.LogOut,
    exact: true,
    component: LogOut,
    text: "logout.title",
  },
  {
    path: Paths.Forgotemail,
    hideInMenu: true,
    public: true,
    exact: true,
    component: ForgotEmail,
  },
  {
    path: Paths.Forgotpassword,
    hideInMenu: true,
    public: true,
    exact: true,
    component: ForgotPassword,
  },
  {
    path: Paths.Dashboard,
    hideInMenu: true,
    exact: true,
    component: Dashboard,
  },
  {
    path: Paths.Games,
    hideInMenu: true,
    exact: true,
    component: Games,
  },
  {
    path: Paths.Mediation,
    hideInMenu: true,
    exact: true,
    component: Mediation,
  },
  {
    path: Paths.UserAcquistion,
    hideInMenu: true,
    exact: true,
    component: UserAcquistion,
  },
  {
    path: Paths.Channels,
    hideInMenu: true,
    exact: true,
    component: Channels,
  },
  {
    path: Paths.Paymentcard,
    hideInMenu: true,
    exact: true,
    component: PaymentCard,
  },
  {
    path: Paths.Profile,
    hideInMenu: true,
    exact: true,
    component: Profile,
  },
  {
    path: Paths.Documentation,
    hideInMenu: true,
    exact: true,
    component: Documentation,
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
