// import React, { useEffect, useContext } from "react";
import { useEffect } from "react";
import { Grid, Header } from "semantic-ui-react";
import { API } from "../../api/API";
import { Paths } from "../../routes";
import { getToken } from "../../authentication/Authentication";
import { RouteComponentProps } from "react-router-dom";

// import { DispatchContext } from "../../App";


export const SecurityCheck = ( { history }: RouteComponentProps ) => {

    // const { dispatch } = useContext(DispatchContext);
    
    // Get analytics data when filters change.
    useEffect(() => {
        const token = getToken();
        if ( token ) {
            API.securityCheck(token).then(
                (data) => {
                    if (data.response !== "success") { 
                        history.push(Paths.LogIn);
                    }
                }
            );
        } else {
            history.push(Paths.LogIn);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    return (
        <Grid style={{ marginTop: "1em" }}>
            <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
                <Header>Security Check</Header>
            </Grid.Row>
        </Grid>
    )
}