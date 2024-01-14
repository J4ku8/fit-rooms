import Link from 'next/link'
import React from "react";
import {Typography} from "@mui/material";
import "../styles.css"
import Providers from "../components/Providers";




const IndexPage = () => {
    return (
                    <Providers transparentFooter title='Room reservation system'>
                        <Typography variant="h1" >This is index page</Typography>
                        <Link href="/rooms">Rooms</Link>
                    </Providers>
    );
}

export default IndexPage
