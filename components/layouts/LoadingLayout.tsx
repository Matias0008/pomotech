import Head from "next/head";

import { Box, Flex } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export const LoadingLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Pomotech</title>
        <meta name="description" content="Pomodoro app for study" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        as="main"
        background="primary"
        minH="100vh"
        pr={2}
        pl={2}
        transition="background 0.6s ease"
      >
        <Flex direction="column" justify="center" align="center" minH="100vh">
          {children}
        </Flex>
      </Box>
    </>
  );
};
