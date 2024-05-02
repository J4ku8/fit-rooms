import React from "react";
import Head from "next/head";
import { useGlobalContext } from "../context/GlobalContext";
import { Box, Typography } from "@mui/material";
import { ProvidersProps } from "../types";

const Layout = ({
  children,
  title,
  transparentFooter,
  isMobile,
}: ProvidersProps) => {
  const year = new Date().getFullYear();
  const { color } = useGlobalContext();
  return (
    <Box
      p={0}
      m={0}
      display="flex"
      minHeight="95vh"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="refresh" content="120" />
      </Head>
      <header />
      {children}
      <footer
        style={{
          textAlign: "center",
          backgroundColor: transparentFooter ? "transparent" : color,
          marginTop: "auto",
          height: "auto",
          padding: "0.5rem 0",
          borderRadius: "0 0 10px 10px",
        }}
      >
        {isMobile ? (
          <Typography variant="subtitle2">
            {`Copyright © 2018-${year} ČVUT v Praze | provozuje ČVUT -`}
            <a target={"_blank"} href={"https://helpdesk.cvut.cz"}>
              Helpdesk ČVUT
            </a>
          </Typography>
        ) : (
          <Typography variant="subtitle2">
            {`Copyright © 2018-${year} ČVUT v Praze | provozuje ČVUT - https://helpdesk.cvut.cz`}
          </Typography>
        )}
      </footer>
    </Box>
  );
};

export default Layout;
