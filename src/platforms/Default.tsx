import { useTranslation } from "react-i18next";

export const DefaultForm = () => {
    const { t } = useTranslation();
    return ( <p>{ t(`editGame.platforms.accordion.comming-soon`)}</p> )
}