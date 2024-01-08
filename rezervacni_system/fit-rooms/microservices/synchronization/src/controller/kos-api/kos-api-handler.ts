import axios from "axios";
import { KosApiHandleTypes } from "../../utils/types";
import xmlParser from "../../utils/xml-parser";
import {TokenManager} from "../../auth/oauth2";

class KosApiHandler {
    private tokenManager: TokenManager

    constructor() {
        this.tokenManager = new TokenManager()
    }

    handleApiCall = async ({query}: KosApiHandleTypes): Promise<any> => {
        const token = await this.tokenManager.getAccessToken()
        const response = await axios.get(query,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return await xmlParser(response.data)
    }
}

export default KosApiHandler
