import React from "react";
import { Dimmer, Loader, Placeholder, Segment } from "semantic-ui-react";

export const GraphCardPlaceholder = () => {
  return (
    <Segment className="full-width borderless" style={{ height: "35em" }}>
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
