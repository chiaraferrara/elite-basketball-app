import React, { useContext, useEffect, useState } from "react";
import { Button, Img, Nav } from "@/styles/globals";
import Link from "next/link";
import { Context } from "../declarations/ContextProvider";

const Navbar = () => {
  const { isLogged, setIsLogged } = useContext(Context);

  const onClickLogout = async () => {
    setIsLogged(false);
    localStorage.removeItem("isLogged");
  };

  useEffect(() => {
    const logged = localStorage.getItem("isLogged");
    if (logged) {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      <Nav>
        <div>
          <Img src="https://i.ibb.co/QFLzj7H/elite.png" />
        </div>
        <Link href="/">
          <Button>Home</Button>
        </Link>

        <Link href="/teams">
          <Button>Teams</Button>
        </Link>

        <Link href="/games">
          <Button>Games</Button>
        </Link>

        {!isLogged ? (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        ) : (
          <>
            <Link href="/add/team">
              <Button>Add Teams</Button>
            </Link>
            <Link href="/add/game">
              <Button>Add Game</Button>
            </Link>
            <Link href="/add/player">
              <Button>Add Players</Button>
            </Link>

            <Button
              onClick={() => {
                onClickLogout();
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
