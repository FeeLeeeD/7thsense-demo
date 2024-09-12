import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const filter = definePartsStyle({
  container: {
    py: "xsmall",
    h: "24px",
    bg: "#FFF",
    border: "1px",
    borderColor: "#4B5259",
    borderRadius: "full",
    color: "#4B5259",
  },
  label: {
    textStyle: "s",
  },
  closeButton: {
    opacity: 1,
    color: "#4B5259",
  },
});

const thick = definePartsStyle({
  container: {
    px: "4",
    py: "2",
    bg: "blue.400",
  },
});

export const tagTheme = defineMultiStyleConfig({
  variants: {
    filter,
    thick: thick,
  },
});
