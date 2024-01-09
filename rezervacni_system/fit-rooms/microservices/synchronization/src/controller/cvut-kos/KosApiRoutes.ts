import {ApiProviders, ApiQuery, KosApiRoutes} from "../../utils/types";
import CvutApiHandler from "./CvutApiHandler";

export class KosApi extends CvutApiHandler{
    getSemester = async () => {
        try {
            const data = await this.handleApiCall({query: `${ApiProviders.KOS_API}${KosApiRoutes.SEMESTER}`})
            console.log(data)
            return data
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
            return null;
        }
    }

    getTeachers = async () => {
        try {

            const dataset = await this.handleApiCall({query: `${ApiProviders.KOS_API}${KosApiRoutes.TEACHERS}`})
            return dataset?.content
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
            return null;
        }
    }
    getParallels = async (semester: string = "B231") => {
        try {
            const dataset = await this.handleApiCall({query: `${ApiProviders.KOS_API}${KosApiRoutes.PARALLELS}?query=semester==${semester}`})
            return dataset?.content?.content
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
            return null;
        }
    }

    getTeacherEventsById = async ({id}: { id: string } & ApiQuery) => {
        try {

            const dataset = await this.handleApiCall({query: `${ApiProviders.KOS_API}${KosApiRoutes.TEACHERS}/${id}/timetable`})
            console.log(dataset)
            return dataset?.content
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
            return null;
        }
    }

    getCourseEvent = async (semester: string = "B231") => {
        try {

            const dataset = await this.handleApiCall({query: `${ApiProviders.KOS_API}${KosApiRoutes.COURSE_EVENT}?query=semester==${semester}`})
            console.log(dataset)
            return dataset?.content
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.response?.data);
            return null;
        }
    }

    getCoursesByDivision = async () => {
        try {

            const dataset = await this.handleApiCall({query: `${ApiProviders.KOS_API}${KosApiRoutes.DIVISION}`})
            console.log(dataset)
            return dataset?.content
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call:', error?.message);
            return null;
        }
    }
}


