import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const primary = definePartsStyle({
  overlay: {
    bg: "rgba(9, 9, 9, 0.20)",
  },
  dialog: {
    borderRadius: "24px",
    bg: `white`,
  },
  header: {
    py: "large",
    px: "xxlarge",
    fontSize: "24px",
    lineHeight: "33.6px",
    color: "#343A40",
  },
  body: {
    pt: "small",
    pb: "xlarge",
    px: "xlarge",
  },
  footer: {
    px: "xxlarge",
    pt: "large",
    pb: "xlarge",
  },
});

export const modalTheme = defineMultiStyleConfig({
  defaultProps: { variant: "primary" },
  variants: { primary },
});
