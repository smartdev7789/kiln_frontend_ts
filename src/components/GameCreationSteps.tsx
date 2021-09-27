import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Step, Label } from "semantic-ui-react";
import { PathHelpers } from "../routes";

type GameCreationStep = {
  completed: boolean;
  text: string;
  active: boolean;
};

type GameCreationStepsProps = {
  steps: GameCreationStep[];
  gameId: string;
};

// Game steps order. (Same length and add in ../routes)
export const GameCreationStepData = [
  {
    text: "gameInfo",
  },
  {
    text: "platforms",
  },
  {
    text: "monetisation",
  },
  {
    text: "leaderboards",
  },
  {
    text: "releases",
  },

];


const createSteps = (currentIndex: number) =>
GameCreationStepData.map((step, i) => {
  return {
    ...step,
    completed: i < currentIndex,
    active: i === currentIndex,
  };
});

// Steps (Same length and add in ../routes)
export const EditGameInfoSteps = createSteps(0);
export const EditGamePlatformsSteps = createSteps(1);
export const EditGameMonetisationSteps = createSteps(2);
export const EditGameLeaderboardsSteps = createSteps(3);
export const EditGameReleasesSteps = createSteps(4);

export const GameCreationSteps = (props: GameCreationStepsProps) => {
  const { t } = useTranslation();

  // (Same length and add in ../routes)
  const pathHelpers: { [key: string]: (object: object) => string } = {
    gameInfo: PathHelpers.EditGameInfo,
    platforms: PathHelpers.EditGamePlatforms,
    monetisation: PathHelpers.EditGameMonetisation,
    leaderboards: PathHelpers.EditGameLeaderboards,
    releases: PathHelpers.EditGameReleases,
  };

  return (
    <Step.Group fluid widths={5}>
      {props.steps.map((step, i) => {
        return (
          <Step
            key={i}
            completed={step.completed}
            active={step.active}
            as={Link}
            to={pathHelpers[step.text]({ id: props.gameId })}
          >
            <div>{step.active}</div>
            <Label circular style={{ marginRight: "0.5em" }}>
              {i + 1}
            </Label>
            <Step.Content>
              <Step.Title>{t(`gameCreationSteps.${step.text}`)}</Step.Title>
            </Step.Content>
          </Step>
        );
      })}
    </Step.Group>
  );
};
