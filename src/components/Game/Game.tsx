import React from "react";
import { Header } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { AppSummary } from "../../api/DataTypes";

export const Game = (appData: AppSummary) => {

    const { t } = useTranslation();

    return(
        <Header size="huge" style={{ marginBottom: 0 }}>
            {t("games.title")}
            <span style={{ paddingLeft: "0.6em", fontSize: "0.6em" }}>
                {/* ({props.games.length}) */}
            </span>
        </Header>

    )

}
