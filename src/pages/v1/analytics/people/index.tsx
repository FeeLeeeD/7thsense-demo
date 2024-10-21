import React from "react";
import { type HeadFC, type PageProps } from "gatsby";
import { AnalyticsPeoplePage } from "~components/pages/analytics/people/page";

export const Head: HeadFC = () => <title>People analytics</title>;

export default function Page(props: PageProps) {
  return <AnalyticsPeoplePage />;
}
