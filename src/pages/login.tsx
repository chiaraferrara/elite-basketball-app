import { useContext, useState } from "react";
import { Context } from "./declarations/ContextProvider";
import { useRouter } from "next/router";
import { AnyARecord } from "dns";

export default function login() {
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
      <h1>Login</h1>
      <form
        action=""
        onSubmit={(event) => {
          authentication(event);
        }}
      >
        <div className="form-group">
          <label>Email:</label>
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            type="text"
            id="email"
            name="email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button type="submit">Invia</button>
      </form>
    </>
  );
}
