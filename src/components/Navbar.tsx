import { Button, Img, Nav } from "@/styles/globals";
import Link from "next/link";

export default function Navbar() {
  return (
    <Nav>
      <div>
        <Img src="https://i.ibb.co/QFLzj7H/elite.png" />
      </div>
      <Link href="/">
        <Button>Home</Button>
      </Link>
      <Link href="/add/team">
        <Button>Add Teams</Button>
      </Link>

      <Link href="/add/player">
        <Button>Add Players</Button>
      </Link>
      <Link href="/contacts">
        <Button>Contacts</Button>
      </Link>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </Nav>
  );
}
