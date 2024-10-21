import { navigate as gatsbyNavigate } from "gatsby";
import { route } from "./routes";

/* Routing */

export const getCurrentVersion = (): string => {
  if (typeof window === "undefined") return "";

  return window.location.pathname.split("/").at(1) ?? "";
};

export const getLink = (to: string | ((r: typeof route) => string)): string => {
  const version = getCurrentVersion();

  if (typeof to === "string") return version ? `/${version}` + to : to;

  return version ? `/${version}` + to(route) : to(route);
};

export const navigate = async (
  to: (r: typeof route) => string,
  options?: { replace?: boolean | undefined }
): Promise<void> => {
  await gatsbyNavigate(getLink(to), options);
};

/* Versioning */

export const conditionalContent = <T1, T2>(args: { v1?: T1; v2?: T2 }) => {
  const version = getCurrentVersion();

  if (version === "v1") return args.v1;
  if (version === "v2") return args.v2;

  return undefined;
};
