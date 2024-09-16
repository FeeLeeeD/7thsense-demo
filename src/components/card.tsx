import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type CardProps = {
  title: string;
} & BoxProps;

export const Card = ({ title, children, ...props }: CardProps) => {
  return (
    <Box bg="white" borderRadius="24px" py="large" px="xxlarge" {...props}>
      <Box
        as="header"
        fontSize="20px"
        lineHeight="28px"
        color="#343A40"
        fontWeight="semibold"
        mb="large"
      >
        {title}
      </Box>

      {children}
    </Box>
  );
};
