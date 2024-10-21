export enum RouteKey {
  Analytics = "analytics",
  Emails = "emails",
  People = "people",
}

export const route = {
  analytics: {
    account: () => `/${RouteKey.Analytics}/account`,
    emails: {
      index: () => `/${RouteKey.Analytics}/${RouteKey.Emails}`,
      email: () => `/${RouteKey.Analytics}/${RouteKey.Emails}/email`,
    },
    people: {
      index: () => `/${RouteKey.Analytics}/${RouteKey.People}`,
      lead: () => `/${RouteKey.Analytics}/${RouteKey.People}/lead`,
    },
  },
};
