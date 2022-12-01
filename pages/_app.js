import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { AuthContextProvider } from "../src/contexts/AuthContext";
import { theme } from "../styles/chakra-ui/theme";
import Navbar from "../src/components/ui/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <AuthContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
