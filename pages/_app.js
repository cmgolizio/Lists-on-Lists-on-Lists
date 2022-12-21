import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { AuthContextProvider } from "../src/contexts/AuthContext";
import { theme } from "../styles/chakra-ui/theme";
import Navbar from "../src/components/ui/Navbar";
import PageTransition from "../styles/framer-motion/PageTransition";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <AuthContextProvider>
        <Navbar />
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
