import { extendTheme } from "@chakra-ui/react";

const colors = {
  light: "ghostwhite",
  dark: "#16161D",
};

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        p: 0,
        m: 0,
        textAlign: "center",
      },
    },
  },
  colors,
});
