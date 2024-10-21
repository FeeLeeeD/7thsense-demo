import { GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: `/`,
    toPath: `/v2/analytics/account`,
    redirectInBrowser: true,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/v1`,
    toPath: `/v1/analytics/account`,
    redirectInBrowser: true,
    isPermanent: true,
  });

  createRedirect({
    fromPath: `/v2`,
    toPath: `/v2/analytics/account`,
    redirectInBrowser: true,
    isPermanent: true,
  });
};
