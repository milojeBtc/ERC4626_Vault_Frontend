import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import routes from "@/routes";
import { WagmiConfig } from "wagmi";

import "@/styles/index.scss";
import "swiper/css";
import "@/styles/rainbow.css";

import { Toaster } from "sonner";

import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { BlockieAvatar } from "./services/web3/BlockieAvatar";
import { appChains } from "./services/web3/wagmiConnectors";
import { wagmiConfig } from "./services/web3/wagmiConfig";

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  useEffect(() => {
    // Redirect to /vault if the URL is /
    if (window.location.pathname === "/") {
      window.location.replace("/vaults");
    }
  }, []);

  return (
    <>
      <ThemeProvider>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            coolMode
            chains={appChains.chains}
            avatar={BlockieAvatar}
            theme={isDarkTheme ? darkTheme() : lightTheme()}
          >
            <RouterProvider router={routes} />
            <Toaster position="top-right" expand={false} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  );
};

export default App;
