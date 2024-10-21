<h1 align="center">
  🚀 Seventh Sense demo site 
</h1>

<p>Based on Gatsby (React, Chakra-UI, TypeScript).</p>
<p>Hosted on Netlify: https://7thsense-demo.site/.</p>

## Local development

1. Run `yarn` to install packages.
2. Run `yarn develop` to start dev server: http://localhost:8000/.

### Conventions

1. **Routing**

Routing is handled by shared functions available in `src/utils/conditional-rendering.ts`.<br>
All the routes are documented in `route` object which is located in `src/utils/routes.ts`.<br>
<b>Please note!</b> Use only functions: `getLink` or `navigate` to handle routing in components. Otherwise, links are likely incorrect.

2. **Conditional Component**

Use `ConditionalComponent` to render components which are different for each version. Example:

```Typescript
export const DeliverabilityVisibilityTab_conditional = () =>
  ConditionalComponent({
    v1: <DeliverabilityVisibilityTab_v1 />,
    v2: <DeliverabilityInsightsTab_v2 />,
  });
```

<b>Please note!</b> Use `_conditional` ending for the name of a component which renders UI depending on version.

## 🚀 Deployment

Pushing commits to `master` branch will re-deploy application on https://7thsense-demo.site/ ([Netlify project](https://app.netlify.com/sites/lucky-centaur-d89ffc/overview))

### Process

1. Run `yarn build` to build static pages. All the built assets are located in `public` folder.
2. Push the content of `public` folder to any kind of S3.

Node is not required. The application is completely static.
