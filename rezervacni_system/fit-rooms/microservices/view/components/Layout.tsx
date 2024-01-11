import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {useGlobalContext} from "../context/GlobalContext";
import {Box, useTheme} from "@mui/material";

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title }: Props) => {
    const { isRoomFree, color } = useGlobalContext();
    const theme = useTheme();
    return (
        <Box p={0} m={0} display="flex" flexDirection="column" justifyContent="space-between">
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta httpEquiv="refresh" content="120"/>
            </Head>
            <header/>
            {children}
            <footer style={{ textAlign: "center", backgroundColor: color, height: "auto", padding: "0.5rem 0" }}>
                <span>Copyright © 2018-2024 ČVUT v Praze | provozuje ČVUT - Výpočetní a informační centrum | Hlášení chyb a námětů <a
                    target="_blank"
                    href="https://helpdesk.cvut.cz/vic_it/web-ist/vytvorit-ulohu">Helpdesk ČVUT</a> </span>
            </footer>
        </Box>
    );
}

export default Layout
