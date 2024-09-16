import React from "react";
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Text,
  TextProps,
} from "@chakra-ui/react";

type ChartWrapperProps = {
  title: string;
  description?: string;
  descriptionProps?: TextProps;
  children: React.ReactNode;
} & BoxProps;

export const ChartWrapper = ({
  title,
  description,
  descriptionProps,
  children,
  ...props
}: ChartWrapperProps) => {
  return (
    <Flex
      as="section"
      flexDir="column"
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
          <Text mt="8px" color="#707880" textStyle="s" {...descriptionProps}>
            {description}
          </Text>
        )}
      </Box>

      {children}
    </Flex>
  );
};
