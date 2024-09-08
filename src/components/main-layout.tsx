import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";

type MainLayoutProps = { children: React.ReactNode };

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex as="main" flexDir="column" h="100vh">
      <Topbar />

      <Flex flex={1}>
        <Sidebar />

        <Container maxW="container.xl" px="xxlarge" py="large">
          {children}
        </Container>
      </Flex>
    </Flex>
  );
};
