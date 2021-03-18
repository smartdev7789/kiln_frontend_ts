import { useTranslation } from "react-i18next";
import { Step, Label } from "semantic-ui-react";

type GameCreationStep = {
  completed: boolean;
  text: string;
  active: boolean;
};

type GameCreationStepsProps = {
  steps: GameCreationStep[];
};

export const GameCreationStepData = [
  {
    text: "platforms",
  },
  {
    text: "gameInfo",
  },
  {
    text: "monetisation",
  },
  {
    text: "analytics",
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

export const EditGamePlatformsSteps = createSteps(0);
export const EditGameInfoSteps = createSteps(1);
export const EditGameMonetisationSteps = createSteps(2);
export const EditGameAnalyticsSteps = createSteps(3);

export const GameCreationSteps = (props: GameCreationStepsProps) => {
  const { t } = useTranslation();

  return (
    <Step.Group fluid widths={4}>
      {props.steps.map((step, i) => {
        return (
          <Step key={i} completed={step.completed} active={step.active}>
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
