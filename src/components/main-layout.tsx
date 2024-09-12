import React from "react";
import { Container, Flex, Grid } from "@chakra-ui/react";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";

type MainLayoutProps = { children: React.ReactNode };

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex as="main" flexDir="column" h="100vh">
      <Topbar />

      <Grid flex={1} gridTemplateColumns="auto 1fr">
        <Sidebar />

        <Container maxW="container.xl" px="xxlarge" py="large">
          {children}
        </Container>
      </Grid>
    </Flex>
  );
};