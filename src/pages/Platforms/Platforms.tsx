import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Icon, Image } from "semantic-ui-react";
import { API } from "../../api/API";
import { Platform, PlatformConnectionStatus } from "../../api/DataTypes";
import { Row, TableCard } from "../../components/Cards/TableCard";
import { PlatformStatusIndicator } from "../../components/PlatformStatusIndicator";
import { Paths } from "../../routes";
import { getToken } from "../../authentication/Authentication";

const platformDataToRow = (
  platformData: Platform,
  {
    connectText,
    moreInfoText,
  }: {
    connectText: string;
    moreInfoText: string;
  }
) => {
  return {
    id: platformData.id,
    cellContents: [
      <Header size="small">
        <Image avatar src={platformData.icon} />
        {platformData.name}
      </Header>,
      platformData.market,
      <PlatformStatusIndicator status={platformData.connection_status} />,
      <Button.Group>
        <Button>{connectText}</Button>
        <Button
          as={Link}
          to={{ pathname: platformData.more_info }}
          target="_blank"
        >
          {moreInfoText}
        </Button>
      </Button.Group>,
    ],
  } as Row;
};

export const Platforms = (props: RouteComponentProps) => {
  const { t } = useTranslation();
  const token = getToken();
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    API.platforms(token).then( ( data ) => {
      setPlatforms(data._items);
    });
  }, [token]);

  const connectedPlatforms = platforms.filter(
    (platform) =>
      platform.connection_status === PlatformConnectionStatus.Connected
  );

  return (
    <Grid style={{ marginTop: "1em" }}>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {t("platforms.title")}
          <span style={{ paddingLeft: "0.6em", fontSize: "0.6em" }}>
            ({connectedPlatforms.length}/{platforms.length}{" "}
            {t("platforms.connected")})
          </span>
        </Header>
        <Button
          compact
          positive
          icon
          labelPosition="left"
          style={{ marginBottom: 0, marginLeft: "auto", padding: "0.5em" }}
          as={Link}
          to={Paths.EditAccountInfo}
        >
          <Icon name="pencil" />
          {t("platforms.editInfo")}
        </Button>
      </Grid.Row>
      <Grid.Row>
        <TableCard
          headers={["name", "market", "status", "actions"]
            .map((string) => t(`platforms.table.headers.${string}`))
            .concat("")}
          rowContents={platforms.map((platformData) =>
            platformDataToRow(platformData, {
              connectText: t("platforms.table.connect"),
              moreInfoText: t("platforms.table.moreInfo"),
            })
          )}
        />
      </Grid.Row>
    </Grid>
  );
};
