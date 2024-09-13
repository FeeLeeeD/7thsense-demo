import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const primary = definePartsStyle({
  field: {
    px: "medium",
    h: "48px",
    bg: "#F8F9FC",
    color: "#4B5259",
    border: "1px solid",
    borderColor: "#E8ECF6",
    borderRadius: "16px",
  },
  icon: {},
});

export const selectTheme = defineMultiStyleConfig({
  defaultProps: { variant: "primary" },
  variants: { primary },
});
