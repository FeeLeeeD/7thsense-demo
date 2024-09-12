import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { PageLayout } from "../../../components/page-layout";

export const Head: HeadFC = () => <title>Emails analytics</title>;

const EmailsAnalyticsPage = (props: PageProps) => {
  return <PageLayout title="Emails">page</PageLayout>;
};

export default EmailsAnalyticsPage;
