import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { PageLayout } from "../../../components/page-layout";

export const Head: HeadFC = () => <title>Leads analytics</title>;

const LeadsAnalyticsPage = (props: PageProps) => {
  return <PageLayout title="Leads">table</PageLayout>;
};

export default LeadsAnalyticsPage;
