import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isAllowed, setIsAllowed] = useState<boolean>(false); // 홈 페이지를 거쳤는지 여부

  return <Component {...pageProps} isAllowed={isAllowed} setIsAllowed={setIsAllowed} />;

}
