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
    global: (props) => ({
      "html, body": {
        p: 0,
        m: 0,
        textAlign: "center",
        color: props.colorMode === "dark" ? "light" : "dark",
        bg: props.colorMode === "dark" ? "dark" : "light",
      },
      "*::placeholder": {
        color: props.colorMode,
      },
    }),
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
