import { FooterContainer, FooterRow, Logos } from "@/styles/globals";
import React from "react";
import Contacts from "./Contacts";
import NextLogo from "../../assets/Nextjs_Logo.png";
import ReactLogo from "../../assets/React-icon.svg.png";
import MySqlLogo from "../../assets/pngwing.com.png";
import TSLogo from "../../assets/typescript-icon-icon-1024x1024-vh3pfez8.png";

export default function Footer() {
  return (
    <>
      <FooterContainer>
        <div className="container">
          <FooterRow>
            <div className="col-sm-12 col-md-6">
              <h2 style={{ margin: "20px" }}>About</h2>
              <p style={{ margin: "20px" }}>
                Elite Basketball è l'applicazione web che consente ai moderatori
                di gestire un torneo di basket in modo efficace, semplice ed
                intuitivo, e consente ai giocatori di visualizzare nel dettaglio
                i dati delle proprie squadre e dei giocatori partecipanti al
                torneo.
              </p>
            </div>
            <Contacts />
          </FooterRow>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div
              style={{
                display: "flex",
                flexFlow: "row wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <a target="_blank" href="https://nextjs.org/">
                <Logos src={NextLogo.src} />
              </a>
              <a target="_blank" href="https://it.legacy.reactjs.org/">
                <Logos src={ReactLogo.src} />
              </a>
              <a target="_blank" href="https://www.mysql.com/it/">
                <Logos src={MySqlLogo.src} />
              </a>
              <a target="_blank" href="https://www.typescriptlang.org/">
                <Logos src={TSLogo.src} />
              </a>
            </div>
          </div>
        </div>
      </FooterContainer>
    </>
  );
}
