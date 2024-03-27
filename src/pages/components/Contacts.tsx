import { ContactWrapper, PreviewPic, RowWrap, Icon } from "@/styles/globals";
import erikaImg from "../../assets/erika.png";
import chiaraImg from "../../assets/chiara.jpg";
import stefanoImg from "../../assets/stefano.jpg";
import githubIcon from "../../assets/github.png";
import linkedinIcon from "../../assets/linkedin.png";

export default function Contacts() {
  return (
    <>
      <ContactWrapper>
        <RowWrap>
          <PreviewPic src={stefanoImg.src} />
          <p>Stefano Cammarata</p>
          <a href="https://github.com/Accia97">
            <Icon src={githubIcon.src} />
          </a>
          <a href="https://www.linkedin.com/in/stefano-cammarata-b4a147218/">
            <Icon src={linkedinIcon.src} />
          </a>
        </RowWrap>
        <RowWrap>
          <PreviewPic src={chiaraImg.src} />
          <p>Chiara Ferrara</p>
          <a href="https://gist.github.com/chiaraferrara">
            <Icon src={githubIcon.src} />
          </a>
          <a href="https://www.linkedin.com/in/chiara-ferrara-41273a265/">
            <Icon src={linkedinIcon.src} />
          </a>
        </RowWrap>
        <RowWrap>
          <PreviewPic src={erikaImg.src} />
          <p>Erika Ciminelli</p>
          <a href="https://github.com/erikacimi">
            <Icon src={githubIcon.src} />
          </a>
          <a href="https://www.linkedin.com/in/erika-ciminelli-48704019b/">
            <Icon src={linkedinIcon.src} />
          </a>
        </RowWrap>
      </ContactWrapper>
    </>
  );
}
