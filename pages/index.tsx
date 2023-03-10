import { useContext, useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { CounterContext } from "@/context/counter";
import { Counter } from "@/components/counter";
import { AppLayout, LoadingLayout } from "@/components/layouts";

import { themes } from "@/styles/theme";
import { Spinner } from "@/components/ui";
import { Tasks } from "@/components/tasks";

export default function Home() {
  const { mode } = useContext(CounterContext);
  const currentTheme = themes[mode];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <ChakraProvider theme={currentTheme}>
        <LoadingLayout>
          <Spinner />
        </LoadingLayout>
      </ChakraProvider>
    );
  }

  return (
    <>
      <ChakraProvider theme={currentTheme}>
        <AppLayout>
          <Counter />
          <Tasks />
        </AppLayout>
      </ChakraProvider>
    </>
  );
}
