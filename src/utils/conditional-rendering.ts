import { navigate as gatsbyNavigate } from "gatsby";
import { route } from "./routes";

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
