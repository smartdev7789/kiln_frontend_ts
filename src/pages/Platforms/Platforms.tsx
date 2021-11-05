import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import { API } from "../../api/API";
import { Platform, PlatformConnectionStatus, TeamPlatform } from "../../api/DataTypes";
import { Row, TableCard } from "../../components/Cards/TableCard";
import { PlatformStatusIndicator } from "../../components/PlatformStatusIndicator";
import { getToken } from "../../authentication/Authentication";
import { DispatchContext } from "../../App";

export const Platforms = (props: RouteComponentProps) => {
  const { t } = useTranslation();
  const token = getToken();
  const [teamPlatforms, setTeamPlatforms] = useState<TeamPlatform[]>([]);
  const { state } = useContext(DispatchContext);

  // All supported platforms
  const platforms = state.platforms || []

  const connectPlatform = async (id: number) => {
    if (!token || !state.account) return;

    const response = await API.connectPlatform(token, state.account!.team_id, id, "");

    if (response?._status !== "ERR") {
      API.getTeamPlatforms(token, state.account!.team_id).then(response => {
        setTeamPlatforms([
          ...teamPlatforms,
          (response._items! as TeamPlatform[]).filter(tp => tp.platform === id)[0]
        ]);
      });
    }
  }
  
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
    const tp = teamPlatforms.filter((teamPlatform) => teamPlatform.platform === platformData.id);
    const connectionStatus = (tp.length === 1)  ? tp[0].connection_status : 0;
    const props = { disabled: false};
    if (connectionStatus !== 0) props.disabled = true;

    return {
      id: platformData.id,
      cellContents: [
        <Header size="small">
          <Image avatar src={platformData.icon} />
          {platformData.name}
        </Header>,
        platformData.market,
        <PlatformStatusIndicator status={connectionStatus} />,
        <Button.Group>
          <Button {...props} onClick={() => connectPlatform(platformData.id)}>{connectText}</Button>
          {/* <Button
            as={Link}
            to={{ pathname: platformData.more_info }}
            target="_blank"
          >
            {moreInfoText}
          </Button> */}
        </Button.Group>,
      ],
    } as Row;
  };

  useEffect(() => {
    if (!token || !state.account) return;
      
    API.getTeamPlatforms(token, state.account!.team_id).then(response => {
      if (response._items) {
        setTeamPlatforms(response._items as TeamPlatform[]);
      }
    });
  }, [token, state.account]);

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
