import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      //   router.push("/");
    }, 3000);
  }, []);
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}
