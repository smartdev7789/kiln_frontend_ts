import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
import { Paths } from "../../routes";

interface Properties {
    message: string;
};

export const TokenValidated = (props: Properties) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header size="medium">
        {props.message}
      </Header>
      <Button fluid as={Link} to={Paths.LogIn}>
        {t("forgotPassword.backToLogin")}
      </Button>
    </Container>
  );
};
