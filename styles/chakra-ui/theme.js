import { extendTheme } from "@chakra-ui/react";

const colors = {
  light: "ghostwhite",
  dark: "#16161D",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
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
  components: {
    Popover: {
      variants: {
        picker: {
          popper: {
            maxWidth: "unset",
            width: "unset",
          },
        },
      },
    },
  },
  colors,
  config,
});
