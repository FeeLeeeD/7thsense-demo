import React from "react";
import { type HeadFC, type PageProps } from "gatsby";
import { AnalyticsLeadPage } from "~components/pages/analytics/people/lead/page";

export const Head: HeadFC = () => <title>Lead analytics</title>;

export default function Page(props: PageProps) {
  return <AnalyticsLeadPage />;
}
