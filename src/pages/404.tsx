import { useRouter } from "next/router";
import { useEffect } from "react";
import gif404 from "../assets/404.gif";
import { Content, NotFoundimg, Page } from "@/styles/globals";
export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      //   router.push("/");
    }, 3000);
  }, []);
  return (
    <Page style={{ backgroundImage: `url(${gif404.src})` }}>
      <Content>
      <h1>404</h1>
    <h2>Page not found</h2>
    <a onClick={() => {
              router.push("/");
            }}>back to home</a>
      </Content>
    </Page>
  );
}
