
import {ApiProviders, ApiQuery, KosApiRoutes} from "../../utils/types";
import KosApiHandler from "./kos-api-handler";
export class KosApi {

    private kosApiHandler: KosApiHandler = new KosApiHandler;
    getTeachers = async () => {
        try {

            const dataset = await this.kosApiHandler.handleApiCall({ query: `${ApiProviders.KOS_API}${KosApiRoutes.TEACHERS}` })
            return dataset?.content
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
        }
    }
    getParallels = async (semester: string = "B231") => {
        try {
            const dataset = await this.kosApiHandler.handleApiCall({ query: `${ApiProviders.KOS_API}${KosApiRoutes.PARALLELS}?query=semester==${semester}` })
            return dataset?.content?.content
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
        }
    }

    getSemester = async () => {
        try {

            const data = await this.kosApiHandler.handleApiCall({ query: `${ApiProviders.KOS_API}${KosApiRoutes.SEMESTER}` })
            console.log(data)
            return data
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
        }
    }

    getTeacherEventsById = async ({id}: { id: string } & ApiQuery) => {
        try {

            const dataset = await this.kosApiHandler.handleApiCall({ query: `${ApiProviders.KOS_API}${KosApiRoutes.TEACHERS}/${id}`})
            console.log(dataset)
            return dataset?.content
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
        }
    }


    getCourseEvent = async () => {
        try {

            const dataset = await this.kosApiHandler.handleApiCall({ query: `${ApiProviders.KOS_API}${KosApiRoutes.COURSE_EVENT}`})
            console.log(dataset)
            return dataset?.content
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.response?.data);
        }
    }

    getCoursesByDivision = async () => {
        try {

            const dataset = await this.kosApiHandler.handleApiCall({ query: `${ApiProviders.KOS_API}${KosApiRoutes.DIVISION}`})
            console.log(dataset)
            return dataset?.content
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
        }
    }
}


