import React from "react";
import { Link as GatsbyLink } from "gatsby";
import {
  Link as ChakraLink,
  LinkProps as CharkaLinkProps,
} from "@chakra-ui/react";

type LinkProps = {
  to: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: string;
} & CharkaLinkProps;

export const getLinkPrefix = () => {
  if (typeof window === "undefined") return;

  return window.location.pathname.startsWith("/v2") ? "/v2" : "";
};

export const Link = ({
  to,
  leftIcon,
  rightIcon,
  children,
  ...props
}: LinkProps) => {
  return (
    <ChakraLink
      as={GatsbyLink}
      to={getLinkPrefix() + to}
      display="inline-block"
      color="#4B5259"
      fontSize="16px"
      lineHeight="24px"
      _hover={{
        textTransform: "none",
        opacity: 0.8,
      }}
      sx={{
        svg: {
          boxSize: "20px",
          mb: "2px",
          ml: rightIcon ? "small" : 0,
          mr: leftIcon ? "small" : 0,
        },
      }}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </ChakraLink>
  );
};
