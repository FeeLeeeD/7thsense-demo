import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./components/button-theme";
import { tagTheme } from "./components/tag-theme";
import { tabsTheme } from "./components/tabs-theme";

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "#F8F9FC" : "#F8F9FC",
      },
    }),
  },

  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },

  textStyles: {
    h2: {
      fontSize: "24px",
      lineHeight: "33.6px",
    },
    l: {
      fontSize: "18px",
      lineHeight: "28px",
    },
    m: {
      fontSize: "16px",
      lineHeight: "24px",
    },
    s: {
      fontSize: "14px",
      lineHeight: "20px",
    },
    xs: {
      fontSize: "12px",
      lineHeight: "16px",
    },
    xxs: {
      fontSize: "10px",
      lineHeight: "14px",
    },
  },

  space: {
    xsmall: "4px",
    small: "8px",
    medium: "12px",
    large: "16px",
    xlarge: "24px",
    xxlarge: "32px",
  },

  semanticTokens: {
    colors: {
      text: {
        38: "#707880",
        60: "#4B5259",
        80: "#343A40",
      },
    },
  },

  components: {
    Button: buttonTheme,
    Tag: tagTheme,
    Tabs: tabsTheme,
  },
});
