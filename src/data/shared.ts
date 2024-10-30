export enum Provider {
  GoogleWorkspace = "googleWorkspace",
  Gmail = "gmail",
  Microsoft365 = "microsoft365",
  VerizonAndCo = "verizon",
  Apple = "apple",
  Overall = "overall",
  Other = "other",
}

export const providerLabel = (provider: Provider) => {
  const label = new Map([
    [Provider.GoogleWorkspace, "Google Workspace"],
    [Provider.Gmail, "Gmail"],
    [Provider.Microsoft365, "Microsoft 365"],
    [Provider.VerizonAndCo, "Verizon/AOL/Yahoo"],
    [Provider.Apple, "Apple"],
    [Provider.Overall, "Overall"],
  ]);

  return label.get(provider) ?? "Other/Unknown";
};

export const chartColor = {
  default: "#8BC1F7",
  dark: "#22222F",
  provider: {
    [Provider.GoogleWorkspace]: "#8BC1F7",
    [Provider.Microsoft365]: "#BDE2B9",
    [Provider.Gmail]: "#F9E0A2",
    [Provider.VerizonAndCo]: "#A2D9D9",
    [Provider.Apple]: "#B2B0EA",
    [Provider.Overall]: "#000000",
    [Provider.Other]: "#ADB5BD",
  },
};
