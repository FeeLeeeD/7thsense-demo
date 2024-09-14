import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const primary = definePartsStyle({
  control: defineStyle({
    borderRadius: "4px",
    boxSize: "24px",
    border: "2px",
    borderColor: "#BEC4DC",
    _checked: {
      bg: "#53C765",
      borderColor: "#53C765",
      _hover: {
        bg: "#78D386",
        borderColor: "#53C765"
      }
    },
  }),
});

export const checkboxTheme = defineMultiStyleConfig({
  defaultProps: { variant: "primary" },
  variants: { primary },
});
