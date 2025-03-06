import { useState, useEffect, ReactNode } from "react";
import { Loading } from "../components/Loading";

export default function Layout({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {!isLoaded && <Loading onLoaded={() => setIsLoaded(true)} />}
      {isLoaded && <div>{children}</div>}
    </div>
  );
}
