import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const primary = definePartsStyle({
  control: {
    boxSize: "24px",
    background: "#F8F9FC",
    borderColor: "#BEC4DC",
    _checked: {
      borderColor: "#53C765",
      background: "#53C765",
      _hover: {
        borderColor: "#53C765",
        background: "#78D386",
      },
    },
  },
  label: {
    color: "#4B5259",
    ml: "small",
    textStyle: "m",
  },
});

export const radioTheme = defineMultiStyleConfig({
  defaultProps: { variant: "primary" },
  variants: { primary },
});
