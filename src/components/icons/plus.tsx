import React from "react";
import { Icon, type IconProps } from "@chakra-ui/react";

export const PlusIcon = (props: IconProps) => {
  return (
    <Icon width="24px" height="24px" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M17.2258 11C17.6534 11 18 11.3358 18 11.75C18 12.1642 17.6534 12.5 17.2258 12.5H12.75V16.9758C12.75 17.4034 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4034 11.25 16.9758L11.25 12.5H6.77419C6.34662 12.5 6 12.1642 6 11.75C6 11.3358 6.34662 11 6.77419 11H11.25V6.52419C11.25 6.09662 11.5858 5.75 12 5.75C12.4142 5.75 12.75 6.09662 12.75 6.52419V11H17.2258Z"
        fill="currentColor"
      />
    </Icon>
  );
};
