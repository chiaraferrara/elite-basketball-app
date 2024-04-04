import { useContext, useState } from "react";
import { Context } from "../declarations/ContextProvider";
import { useRouter } from "next/router";
import { AnyARecord } from "dns";
import {
  Button,
  CardForm,
  Input,
  LabelInput,
  PageButton,
  TeamGameColumn,
} from "@/styles/globals";
import pswIcon from "../assets/psw.png";
import mailIcon from "../assets/mail.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogged, setIsLogged } = useContext(Context);
  const router = useRouter();

  const authentication = (event: any) => {
    event.preventDefault();
    if (
      email == process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      password == process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setIsLogged(true);
      localStorage.setItem("isLogged", "true"); // Memorizza direttamente "true"
      router.push("/");
    } else {
      alert("Invalid mail or password");
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}></div>

      <CardForm>
        <h1 style={{ textDecoration: "" }}>Login</h1>
        <form
          style={{ display: "flex", flexFlow: "column wrap", padding: "40px" }}
          onSubmit={async (event) => {
            await authentication(event);
          }}
        >
          <LabelInput>
            <fieldset>
              <legend style={{ fontSize: "15px" }}>Email</legend>
              <label>
                <img src={mailIcon.src} />
              </label>
              <Input
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
                type="text"
                id="email"
                name="email"
              />
            </fieldset>
          </LabelInput>
          <LabelInput>
            <fieldset>
              <legend style={{ fontSize: "15px" }}>Password</legend>
              <label>
                <img src={pswIcon.src} />
              </label>
              <Input
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
                type="password"
                id="password"
                name="password"
              />
            </fieldset>{" "}
          </LabelInput>{" "}
          <Button type="submit">Login</Button>
        </form>
      </CardForm>
    </>
  );
}
