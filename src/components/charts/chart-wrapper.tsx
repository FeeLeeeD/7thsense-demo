import React from "react";
import { Box, BoxProps, Heading, Text } from "@chakra-ui/react";

type ChartWrapperProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
} & BoxProps;

export const ChartWrapper = ({
  title,
  description,
  children,
  ...props
}: ChartWrapperProps) => {
  return (
    <Box
      as="section"
      bg="white"
      borderRadius="24px"
      px="xxlarge"
      py="large"
      {...props}
    >
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
