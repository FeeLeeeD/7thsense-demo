import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

/* Variants */

const primary = defineStyle({
  background: "#2970FF",
  color: "#F1F3F5",
  _hover: { bg: "#4785FF" },
  _active: { bg: "#0A5BFF" },
});

const green = defineStyle({
  background: "#0AAF23",
  color: "#F1F3F5",
  _hover: { bg: "#2FBB44" },
  _active: { bg: "#09951E" },
});

const secondary = defineStyle({
  background: "#F8F9FC",
  border: "1px",
  borderColor: "#BEC4DC",
  _hover: { bg: "#FFF", borderColor: "#D9DDEA" },
  _active: { bg: "#E8ECF6", borderColor: "#BEC4DC" },
});

/* Sizes */

const medium = defineStyle({
  textStyle: "m",
  px: "xlarge",
  h: "48px",
  borderRadius: "12px",
  fontWeight: "semibold",
});

export const buttonTheme = defineStyleConfig({
  sizes: { medium },
  variants: { primary, secondary, green },
  defaultProps: { variant: "primary", size: "medium" },
});
