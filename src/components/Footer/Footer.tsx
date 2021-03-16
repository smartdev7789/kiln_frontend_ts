import { Container, Divider, Image } from "semantic-ui-react";
import Logo from "../../images/logos/full-grey.png";

export const Footer = () => {
  return (
    <Container>
      <Divider />
      <Container style={{ display: "flex" }}>
        <Image src={Logo} size="medium" />
        <p style={{ margin: "auto", marginRight: "0", color: "#B3B3B3" }}>
          © 2021 GameBake LTD. All Rights Reserved.
        </p>
      </Container>
    </Container>
  );
};
