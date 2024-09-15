import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const primary = definePartsStyle((props) => {
  const { colorScheme: c, colorMode } = props;

  return {
    th: {
      px: "large",
      bg: "#F0F2F8",
      color: "#4B5259",
      fontSize: "14px",
      textTransform: "none",

      borderWidth: "1px 1px 1px 0",
      borderColor: "#BEC4DC",

      _first: {
        border: "none",
        outlineStyle: "solid",
        outlineWidth: "1px",
        outlineOffset: "-0.5px",
        outlineColor: "#BEC4DC",
        borderTopLeftRadius: "16px",
      },

      _last: {
        border: "none",
        outlineStyle: "solid",
        outlineWidth: "1px",
        outlineOffset: "-0.5px",
        outlineColor: "#BEC4DC",
        borderTopRightRadius: "16px",
      },

      "&[data-is-numeric=true]": {
        textAlign: "start",
      },
    },
    td: {
      bg: "white",
      borderWidth: "1px 1px 1px 1px",
      borderColor: "#BEC4DC",
      py: "small",
      px: "large",
      textStyle: "s",
      color: "#343A40",

      "&[data-is-numeric=true]": {
        textAlign: "start",
      },
    },
    caption: {
      color: colorMode === "light" ? `${c}.600` : `${c}.100`,
    },
    tbody: {
      tr: {
        "&:last-child": {
          td: {
            _first: {
              border: "none",
              outlineStyle: "solid",
              outlineWidth: "1px",
              outlineOffset: "-0.5px",
              outlineColor: "#BEC4DC",
              borderBottomLeftRadius: "16px",
            },

            _last: {
              border: "none",
              outlineStyle: "solid",
              outlineWidth: "1px",
              outlineOffset: "-0.5px",
              outlineColor: "#BEC4DC",
              borderBottomRightRadius: "16px",
            },
          },
        },
      },
    },
  };
});

export const tableTheme = defineMultiStyleConfig({
  defaultProps: { variant: "primary" },
  variants: { primary },
});
