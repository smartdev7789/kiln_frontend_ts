import React, { useContext } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Dropdown, Menu as SemanticMenu } from "semantic-ui-react";
import { Paths, RouteConfig } from "../../routes";
import Logo from "../../images/logos/thumb-black.png";
import { useTranslation } from "react-i18next";
import { DispatchContext } from "../../App";

interface MenuProps extends RouteComponentProps {
  routes: RouteConfig[];
}

export const Menu = ({ routes, location }: MenuProps) => {
  const { t } = useTranslation();
  const { state } = useContext(DispatchContext);

  return (
    <SemanticMenu>
      <SemanticMenu.Item as={Link} to={Paths.Root}>
        <img alt="Gamebake logo" src={Logo} />
      </SemanticMenu.Item>
      {routes
        .filter((route) => !route.hideInMenu)
        .map((route) => {
          if (route.routes) {
            return (
              <SemanticMenu.Menu
                key={route.path}
                position={route.floatRight ? "right" : undefined}
              >
                <Dropdown
                  item
                  text={
                    route.path === Paths.Account
                      ? state.user?.name
                      : t(route.text || "")
                  }
                >
                  <Dropdown.Menu>
                    {route.routes
                      .filter((route) => !route.hideInMenu)
                      .map((subroute) => {
                        return (
                          <Dropdown.Item
                            as={Link}
                            key={subroute.path}
                            to={
                              subroute.external
                                ? { pathname: subroute.path }
                                : subroute.path
                            }
                            target={subroute.external ? "_blank" : undefined}
                            active={location.pathname === subroute.path}
                          >
                            {t(subroute.text || "")}
                          </Dropdown.Item>
                        );
                      })}
                  </Dropdown.Menu>
                </Dropdown>
              </SemanticMenu.Menu>
            );
          } else {
            return (
              <SemanticMenu.Item
                as={Link}
                key={route.path}
                name={route.path}
                to={route.external ? { pathname: route.path } : route.path}
                target={route.external ? "_blank" : undefined}
                active={location.pathname === route.path}
                position={route.floatRight ? "right" : undefined}
              >
                {t(route.text || "")}
              </SemanticMenu.Item>
            );
          }
        })}
    </SemanticMenu>
  );
};
