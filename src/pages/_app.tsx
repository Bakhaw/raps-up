import type { AppProps } from "next/app";

import ContextProvider from "@/context";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
