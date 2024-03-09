import Link from 'next/link'
import React from "react";
import {Typography} from "@mui/material";
import Providers from "../src/components/Providers";
import "../styles.css"


const IndexPage = () => {
    return (
        <Providers transparentFooter title='Room reservation system'>
            <Typography variant="h1">This is index page</Typography>
            <Link href="/rooms">Rooms</Link>
        </Providers>
    );
}

export default IndexPage
