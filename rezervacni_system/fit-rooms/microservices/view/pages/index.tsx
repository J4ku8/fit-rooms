import Link from 'next/link'
import Layout from '../components/Layout'
import React, {useCallback, useEffect, useState} from "react";
import {GlobalContextProvider} from "../context/GlobalContext";

const IndexPage = () => {

    return (
        <GlobalContextProvider>
            <Layout title='Room reservation system'>
                <h1>This is index page</h1>
                <Link href="/rooms">Rooms</Link>
            </Layout>
        </GlobalContextProvider>
    );
}

export default IndexPage
