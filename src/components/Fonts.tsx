import React from "react";
import { Global } from "@emotion/react";

export const Fonts = () => (
  <Global
    styles={`
        @font-face {
            font-family: 'Inter';
            font-weight: 400;
            font-display: swap;
            font-style: normal;
            font-named-instance: 'Regular';
            src: url(/fonts/Inter-Regular.woff2) format("woff2");
        }
      
        @font-face {
            font-family: 'Inter-Medium';
            font-weight: 500;
            font-display: swap;
            font-style: medium;
            font-named-instance: 'Medium';
            src: url(/fonts/Inter-Medium.woff2) format("woff2");
        }
      
        @font-face {
            font-family: 'Inter-SemiBold';
            font-weight: 600;
            font-display: swap;
            font-style: semi-bold;
            font-named-instance: 'SemiBold';
            src: url(/fonts/Inter-SemiBold.woff2) format("woff2");
        }
      `}
  />
);
