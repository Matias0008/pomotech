import { useContext } from "react";
import Head from "next/head";

import { Box, Flex } from "@chakra-ui/react";

import { CounterContext } from "@/context/counter";
import { Navbar } from "../ui";

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  const { mode, formattedTime } = useContext(CounterContext);
  const title = mode === "Pomodoro" ? "Time to focus!" : "Time for a break!";

  return (
    <>
      <Head>
        <title>{`${formattedTime} | ${title}`}</title>
        <meta name="description" content="Pomodoro app for study" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        as="main"
        background="primary"
        minH="150vh"
        pr={2}
        pl={2}
        transition="background 0.6s ease"
      >
        <Navbar />
        <Flex
          direction="column"
          // justify="center"
          align="center"
          minH="calc(100vh - 60px)"
        >
          {children}
        </Flex>
      </Box>
    </>
  );
};
