import { GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: `/`,
    toPath: `/analytics/account`,
    redirectInBrowser: true,
    isPermanent: true,
  });
};
