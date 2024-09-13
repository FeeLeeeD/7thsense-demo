import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

type ChartWrapperProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const ChartWrapper = ({
  title,
  description,
  children,
}: ChartWrapperProps) => {
  return (
    <Box as="section" bg="white" borderRadius="24px" px="xxlarge" py="large">
      <Box as="header" mb="xxlarge">
        <Heading fontSize="24px" fontWeight="semibold" color="#343A40">
          {title}
        </Heading>
        {description && (
          <Text mt="4px" color="#707880">
            {description}
          </Text>
        )}
      </Box>

      {children}
    </Box>
  );
};
