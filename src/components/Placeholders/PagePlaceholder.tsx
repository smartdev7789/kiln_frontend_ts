import React from "react";
import { Dimmer, Loader, Placeholder, Segment } from "semantic-ui-react";

export const PagePlaceholder = () => {
  return (
    <Segment>
      <Dimmer active>
        <Loader />
      </Dimmer>
      {[0, 1, 2, 3].map((i) => {
        return (
          <Segment key={i}>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </Segment>
        );
      })}
    </Segment>
  );
};
