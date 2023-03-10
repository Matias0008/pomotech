import type { AppProps } from "next/app";

import { CounterProvider } from "@/context/counter";

import "@/styles/globals.css";
import { TaskProvider } from "@/context/tasks";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CounterProvider>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </CounterProvider>
  );
}
