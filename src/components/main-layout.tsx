import React from "react";
import { Box, Container, Flex, Grid } from "@chakra-ui/react";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";

type MainLayoutProps = { children: React.ReactNode };

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex as="main" flexDir="column" h="100vh">
      <Topbar pos="fixed" top="0" w="full" />

      <Grid flex={1} gridTemplateColumns="auto 1fr">
        <Sidebar />

        <Box>
          <Box h="68px" />

          <Container maxW="container.xl" px="xxlarge" py="large">
            {children}
          </Container>
        </Box>
      </Grid>
    </Flex>
  );
};
