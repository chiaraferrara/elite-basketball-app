import type { AppProps } from "next/app";
import ContextProvider from "./declarations/ContextProvider";
import Navbar from "@/pages/components/Navbar";
import { Global, css } from "@emotion/react";
import GamesList from "./components/GamesList";
import Footer from "./components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Slab:wght@100..900&display=swap");
          body {
            font-family: "Poppins", sans-serif;
            margin: 0;
            background-color: #f02b2b;
          }
        `}
      />
      {/* background: rgb(36, 36, 36);
            background: linear-gradient(
              120deg,
              rgba(36, 36, 36, 1) 0%,
              rgba(86, 37, 36, 1) 10%,
              rgba(178, 38, 37, 1) 30%,
              rgba(183, 38, 37, 1) 50%,
              rgba(174, 38, 37, 1) 70%,
              rgba(110, 37, 36, 1) 90%,
              rgba(53, 36, 36, 1) 100%
            ); */}
      <ContextProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ContextProvider>
    </>
  );
}
