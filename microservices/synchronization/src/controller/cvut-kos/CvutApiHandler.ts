import axios from 'axios';
import {
  AtomlessObject,
  KosApiHandleTypes,
  KosApiRoutes,
} from '../../utils/types';
import xmlParser from '../../utils/xml-parser';
import { TokenManager } from '../../midleware/auth/TokenManager';

class CvutApiHandler {
  private tokenManager: TokenManager;

  constructor() {
    this.tokenManager = new TokenManager();
  }

  handleApiCall = async ({
    query,
  }: KosApiHandleTypes): Promise<AtomlessObject[]> => {
    const token = await this.tokenManager.getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(query, config);

    if (query.includes(KosApiRoutes.SEMESTER)) {
      const semesterName = await axios.get(`${query}/current`, config);
      const semesterInfo = await axios.get(
        `${query}/${semesterName.data}`,
        config
      );
      return await xmlParser(semesterInfo.data);
    }
    return await xmlParser(response.data);
  };
}

export default CvutApiHandler;
