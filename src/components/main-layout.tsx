import React from "react";
import { Box, Container, Flex, Grid } from "@chakra-ui/react";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";

type MainLayoutProps = { children: React.ReactNode };

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box as="main">
      <Topbar pos="sticky" top="0" w="full" />

      <Flex>
        <Sidebar />

        <Container maxW="container.xl" px="xxlarge" py="large" mx="auto">
          {children}
        </Container>
      </Flex>
    </Box>
  );
};
