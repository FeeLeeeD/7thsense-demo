import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const primary = definePartsStyle((props) => {
  return {
    tab: {
      fontSize: { base: "14px", lg: "18px" },
      lineHeight: "28px",
      py: "xsmall",
      px: "large",
      color: "#707880",
      borderBottom: "2px",
      marginBottom: "-2px",
      borderColor: "#707880",
      _hover: {
        color: "#23272B",
        borderColor: "#707880",
      },
      _selected: {
        color: "#0A5BFF",
        borderColor: "#0A5BFF",
      },
    },
    tablist: {
      borderBottom: "2px",
      borderColor: "#707880",
    },
    tabpanel: {
      px: "0",
      py: "xlarge",
    },
  };
});

// export the component theme
export const tabsTheme = defineMultiStyleConfig({
  variants: { primary },
  defaultProps: { variant: "primary" },
});
