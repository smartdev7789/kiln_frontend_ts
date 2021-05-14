import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Checkbox, Grid, Header, Image } from "semantic-ui-react";
import { API } from "../../api/API";
import { AppInfo, Platform } from "../../api/DataTypes";
import { DispatchContext } from "../../App";
import { Row, TableCard } from "../../components/Cards/TableCard";
import {
  EditGamePlatformsSteps,
  GameCreationSteps,
} from "../../components/GameCreationSteps";
import {
  StatusIndicator,
  StatusDisabled,
} from "../../components/StatusIndicator";
import { PathHelpers } from "../../routes";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
import { getToken } from "../../authentication/Authentication";

const platformDataToRow = (
  platformData: Platform,
  {
    enabled,
    onChange,
    status,
  }: {
    enabled: boolean;
    onChange: (platformId: number) => void;
    status: number;
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
      <StatusIndicator status={status} />,
      <Checkbox onChange={() => onChange(platformData.id)} checked={enabled} />,
    ],
  } as Row;
};

export const EditGamePlatforms = (props: RouteComponentProps) => {
  
  
  const { t } = useTranslation();
  const { state } = useContext(DispatchContext);

  // const [gameData, setGameData] = useState<AppInfo | null>(
  //   props.location.state ? ((props.location.state as any).app as AppInfo) : null
  // );

  const [gameData, setGameData] = useState<AppInfo | null>(null)

  const handlePlatformEnabledChange = (platformId: number) => {
    if (gameData === null) return;

    if (gameData.platforms_info.map((p) => p.id).includes(platformId)) {
      setGameData({
        ...gameData,
        platforms_info: gameData.platforms_info.filter((plat) => plat.id !== platformId),
      });
    } else {
      setGameData({
        ...gameData,
        platforms_info: [...gameData.platforms_info, { id: platformId, status: 0 }],
      });
    }
  };

  useEffect(() => {
    console.log(gameData);
    const token = getToken();
    if (!gameData || !gameData.name) {
      const gameID = (props.match.params as { id: string }).id;
      API.app(token, gameID).then( (app) => { 
        console.log(app);
        // setGameData(app); 
      });
    }
  }, [gameData, gameData?.name, props.match.params]);

  const platforms = state.platforms || [];

  if (gameData === null) return <PagePlaceholder />;

  const gamePlatforms = gameData.platforms_info;
  // const gamePlatformIds = gameData.platforms_info.map((platform) => platform.id);

  return (
    <Grid style={{ marginTop: "1em" }}>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {gameData.name} - {t("editGame.platforms.title")}
        </Header>
        <Button
          compact
          positive
          style={{ marginBottom: 0, marginLeft: "auto", padding: "0.5em" }}
          as={Link}
          // to={PathHelpers.EditGameInfo({ id: gameData.id })}
        >
          {t("editGame.nextStep")}
        </Button>
      </Grid.Row>
      <Grid.Row>
        <GameCreationSteps
          steps={EditGamePlatformsSteps}
          gameId={gameData.id!}
        />
      </Grid.Row>
      <Grid.Row>
        {/* <TableCard
          headers={["platform", "market", "status", "enabled"].map((string) =>
            t(`editGame.platforms.table.headers.${string}`)
          )}
          rowContents={platforms.map((platformData) =>
            platformDataToRow(platformData, {
              enabled: gamePlatformIds.includes(platformData.id),
              onChange: handlePlatformEnabledChange,
              status: gamePlatformIds.includes(platformData.id)
                ? gamePlatforms.find((plat) => plat.id === platformData.id)!
                    .status
                : StatusDisabled,
            })
          )}
        /> */}
      </Grid.Row>
    </Grid>
  );
};
