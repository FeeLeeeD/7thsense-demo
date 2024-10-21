import React from "react";
import { type HeadFC, type PageProps } from "gatsby";
import { AnalyticsEmailPage } from "~components/pages/analytics/emails/email/page";

export const Head: HeadFC = () => <title>Email analytics</title>;

export default function Page(props: PageProps) {
  return <AnalyticsEmailPage />;
}
