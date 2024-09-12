import React from "react";
import { Box, Heading } from "@chakra-ui/react";

type PageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <>
      <Heading as="h1" textStyle="h2" fontWeight="semibold">
        {title}
      </Heading>

      <Box mt="xlarge">{children}</Box>
    </>
  );
};
