import {QueryClientProvider} from "react-query";
import queryClient from "../utils/query-client";
import {GlobalContextProvider} from "../context/GlobalContext";
import Layout from "./Layout";
import {ProvidersProps} from "../types";

const Providers = ({children, transparentFooter}: ProvidersProps) => (
    <QueryClientProvider client={queryClient}>
            <GlobalContextProvider>
                <Layout transparentFooter={transparentFooter}>
                    {children}
                </Layout>
            </GlobalContextProvider>
        </QueryClientProvider>)

export default Providers
