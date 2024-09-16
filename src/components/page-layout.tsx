import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { AltArrowDownIcon } from "./icons/alt-arrow-down";
import { Link } from "./link";

type PageLayoutProps = {
  title: string;
  children: React.ReactNode;
  back?: boolean;
};

export const PageLayout = ({ title, back, children }: PageLayoutProps) => {
  return (
    <>
      {back && (
        <Link
          to="/analytics/emails"
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

      <Box mt="xlarge">{children}</Box>
    </>
  );
};
