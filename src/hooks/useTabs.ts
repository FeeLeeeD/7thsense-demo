type Tab = { key: string; title?: React.ReactNode; body: React.ReactNode };
type UseTabsArgs = {
  tabs: Tab[];
};

export function useTabs({ tabs }: UseTabsArgs): UseTabsReturn {
  const onTabChange = (tabIndex: number) => {
    const tab = tabs.at(tabIndex);
    let pathname = window.location.pathname;
    if (tab && tabIndex > 0) {
      const queryParams = new URLSearchParams({ tab: tab.key }).toString();
      pathname = `${window.location.pathname}?${queryParams}`;
    }

    window.history.replaceState(
      { ...window.history.state, as: pathname, url: pathname },
      "",
      pathname
    );
  };

  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : undefined;
  const defaultTabIndex =
    params && tabs.findIndex((tab) => tab.key === params.get("tab"));

  return {
    tabs,
    defaultTabIndex:
      defaultTabIndex && defaultTabIndex >= 0 ? defaultTabIndex : 0,
    onTabChange,
  };
}

type UseTabsReturn = {
  defaultTabIndex: number;
  onTabChange: (index: number) => void;
  tabs: Tab[];
};
