import React from "react";
import { type HeadFC, type PageProps } from "gatsby";
import { AnalyticsEmailsPage } from "~components/pages/analytics/emails/page";

export const Head: HeadFC = () => <title>Emails analytics</title>;

export default function Page(props: PageProps) {
  return <AnalyticsEmailsPage />;
}
