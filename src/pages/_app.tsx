import type { AppProps } from "next/app";
import ContextProvider from "../declarations/ContextProvider";
import Navbar from "@/pages/components/Navbar";
import { Global, css } from "@emotion/react";
import GamesList from "./components/GamesList";
import Footer from "./components/Footer";
import { MinHeight } from "@/styles/globals";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Slab:wght@100..900&display=swap");
          body {
            font-family: "Poppins", sans-serif;
            margin: auto;

            background: rgb(204, 195, 195);
            background: linear-gradient(
              156deg,
              rgba(204, 195, 195, 1) 0%,
              rgba(204, 195, 195, 1) 0%,
              rgba(112, 115, 114, 1) 100%
            );

            // width: 60%;
          }
        `}
      />
      <ContextProvider>
        <Navbar />
        <MinHeight>
          <Component {...pageProps} />
        </MinHeight>
        <Footer />
      </ContextProvider>
    </>
  );
}
