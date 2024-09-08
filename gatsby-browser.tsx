import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./src/chakra/theme";
import { Fonts } from "./src/components/Fonts";
import { MainLayout } from "./src/components/main-layout";

export const wrapPageElement = ({ element, props }) => {
  return (
    <ChakraProvider theme={theme} {...props}>
      <Fonts />

      <MainLayout>{element}</MainLayout>
    </ChakraProvider>
  );
};
