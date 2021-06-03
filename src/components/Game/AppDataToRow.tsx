import { AppSummary } from "../../api/DataTypes";
import { StatusIndicator } from "../StatusIndicator";
import { PathHelpers } from "../../routes";
import { Button, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../images/logos/thumb-grey.png";

export const appDataToRow = (appData: AppSummary, edit: string, releases: string) => {

    if (! appData.icon) { appData.icon= Logo }
    
    // 0 Draft
    // 1 In review
    // 2 Active
    // 3 Deactiveate
    // 4 Disable
    const status = 0;

    // 0 Free
    // 1 Paid
    const type:string = appData.type === 0 ? 'Free': 'Paid';

    return {
      id: appData.id,
      
      cellContents: [
        <Header size="small">
          {/* <Image avatar src={appData.icon} /> */}
          <Link to={PathHelpers.Analytics(appData.id.toString())}>
            {appData.name}
          </Link>
        </Header>,
        
        Array.isArray(appData.platforms) ?
          appData.platforms.map((platformIconUrl, i) => (
            <Image key={i} avatar src={platformIconUrl} />
          ))
        : '',
        <>{type}</>,

        <>{appData.default_language}</>,

        <StatusIndicator status={status} />,
        
        <Button.Group>
          <Button as={Link} to={PathHelpers.EditGameInfo({ id: appData.id })}>
            {edit}
          </Button>

          <Button as={Link} to={PathHelpers.EditGameReleases({ id: appData.id })}>
            {releases}
          </Button>
      </Button.Group>,
      ],
    };
  };