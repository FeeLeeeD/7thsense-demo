import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { getLink } from "~utils/conditional-rendering";
import { route } from "~utils/routes";
import {
  Link as ChakraLink,
  LinkProps as CharkaLinkProps,
} from "@chakra-ui/react";

type LinkProps = {
  to: (r: typeof route) => string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: string;
} & CharkaLinkProps;

export const Link = React.forwardRef<HTMLLinkElement, LinkProps>(
  ({ to, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <ChakraLink
        ref={ref}
        as={GatsbyLink}
        to={getLink(to)}
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
  }
);
