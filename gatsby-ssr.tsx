import React from "react";
import { theme } from "./src/chakra/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { MainLayout } from "./src/components/main-layout";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/Inter-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interFont"
    />,
    <link
      rel="preload"
      href="/fonts/Inter-Medium.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interFont"
    />,
    <link
      rel="preload"
      href="/fonts/Inter-SemiBold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interFont"
    />,
  ]);
};

export const wrapPageElement = ({ element, props }) => (
  <ChakraProvider theme={theme} {...props}>
    <MainLayout>{element}</MainLayout>
  </ChakraProvider>
);
