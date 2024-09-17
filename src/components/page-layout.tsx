import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { AltArrowDownIcon } from "./icons/alt-arrow-down";
import { Link } from "./link";

type PageLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  back?: string;
};

export const PageLayout = ({
  title,
  description,
  back,
  children,
}: PageLayoutProps) => {
  return (
    <>
      {back && (
        <Link
          to={back}
          leftIcon={<AltArrowDownIcon transform="rotate(90deg)" />}
          mb="xsmall"
        >
          Back
        </Link>
      )}

      <Heading
        as="h1"
        fontSize="24px"
        lineHeight="33.6px"
        fontWeight="semibold"
        color="#343A40"
      >
        {title}
      </Heading>

      {description && (
        <Text mt="xsmall" fontSize="20px" lineHeight="28px" color="#4B5259">
          {description}
        </Text>
      )}

      <Box mt="xlarge">{children}</Box>
    </>
  );
};
