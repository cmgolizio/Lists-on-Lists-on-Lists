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
        maxH: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
        p: 0,
        m: 0,
        textAlign: "center",
        color: props.colorMode === "dark" ? "light" : "dark",
        bg: props.colorMode === "dark" ? "dark" : "light",
      },
      "*::placeholder": {
        color:
          props.colorMode === "dark"
            ? "0px 45px 50px -25px rgba(248,248,255,0.75)"
            : "0px 45px 50px -25px rgba(22,22,29,0.75)",
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
