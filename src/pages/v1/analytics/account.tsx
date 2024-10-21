import React from "react";
import type { HeadFC } from "gatsby";
import { AccountAnalyticsPage } from "~components/pages/analytics/account/page";

export const Head: HeadFC = () => <title>Account analytics</title>;

export default function Page() {
  return <AccountAnalyticsPage />;
}
