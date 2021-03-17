import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
import { Paths } from "../../routes";

export const PasswordRequested = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header size="medium">
        {t("forgotPassword.passwordRequested.message")}
      </Header>
      <Button fluid as={Link} to={Paths.LogIn}>
        {t("forgotPassword.backToLogin")}
      </Button>
    </Container>
  );
};
