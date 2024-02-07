import MicrosoftAuth from "../components/model/GraphApiClient";
import {AppSettings, GraphApiFetch} from "../types";
import {useEffect, useState} from "react";
import {Client} from "@microsoft/microsoft-graph-client";

const settings: AppSettings = {
    clientSecret:  process.env.CLIENT_SECRET_MS || "",
    clientId:  process.env.CLIENT_ID_MS || "",
    tenantId: process.env.TENANT_ID_MS || "",
    graphUserScopes: ["user.read"]
}
export const useGraphApiClient = () => {
    const [client, setClient] = useState<Client | null>(null)
    const microsoftAuth = new MicrosoftAuth(settings)
    useEffect(() => {
        setClient(microsoftAuth.initializeGraphForAppOnlyAuth)
    }, [microsoftAuth, settings])

    return client
}
