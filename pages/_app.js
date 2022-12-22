import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { AuthContextProvider } from "../src/contexts/AuthContext";
import { theme } from "../styles/chakra-ui/theme";
import Navbar from "../src/components/ui/Navbar";
import PageTransition from "../styles/framer-motion/PageTransition";
import Footer from "../src/components/ui/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <AuthContextProvider>
        <Navbar />
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
        <Footer />
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
