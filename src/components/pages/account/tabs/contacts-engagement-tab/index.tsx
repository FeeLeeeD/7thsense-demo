import React from "react";
import { WorldMap } from "../../../../charts/world-map";
import { ChartWrapper } from "../../../../charts/chart-wrapper";

export const ContactsEngagementTab = () => {
  return (
    <>
      <ChartWrapper
        title="Contacts engagement by place"
        description="Here can be a short description?"
      >
        <WorldMap />
      </ChartWrapper>
    </>
  );
};
