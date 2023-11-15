import axios from "axios";
import {ApiProviders, ApiQuery, KosApiRoutes} from "../../utils/types";
import {TokenManager} from "../../auth/oauth2";

export class KosApi {
    private access_token: string = ""

    constructor(token: string) {
        this.access_token = token
    }

    static async createInstanceAsync() {
        const tokenManager = new TokenManager();
        const asyncValue = await tokenManager.getAccessToken()

        return new KosApi(asyncValue);
    }


    getTeachers = async () => {
        try {
            const response = await axios.get(`${ApiProviders.KOS_API}${KosApiRoutes.TEACHERS}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`
                    }
                });
            console.log(response.data)
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
        }
    }
    getParallels = async ({semester = "B231"}: { semester: string }) => {
        try {
            const response = await axios.get(`${ApiProviders.KOS_API}${KosApiRoutes.PARALLELS}?query=semester==${semester}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`
                    }
                });
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
        }
    }

    getSemester = async (req: Request, res: Response) => {
        try {
            const response = await axios.get(`${ApiProviders.KOS_API}${KosApiRoutes.SEMESTER}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`
                    }
                });
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
        }
    }

    getTeacherEventsById = async ({id}: { id: string } & ApiQuery) => {
        try {
            const response = await axios.get(`${ApiProviders.KOS_API}${KosApiRoutes.TEACHERS}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`
                    }
                });
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
        }
    }


    getCourseEvent = async (req: Request, res: Response) => {
        try {

            const response = await axios.get(`${ApiProviders.KOS_API}${KosApiRoutes.COURSE_EVENT}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`
                    }
                });
            console.log(response.data)
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.response?.data);
        }
    }

    getCoursesByDivision = async (req: Request, res: Response) => {
        try {
            const response = await axios.get(`${ApiProviders.KOS_API}${KosApiRoutes.DIVISION}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`
                    }
                });
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
        }
    }
}


