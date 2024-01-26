import {ApiProviders, KosApiRoutes, SemesterSchema} from "../../utils/types";
import CvutApiHandler from "./CvutApiHandler";
import {LIMIT} from "../../utils/constants";
import Semester from "../../db/model/semester";
import Room from "../../db/model/room";

;

export class KosApiClient extends CvutApiHandler{

    private _filterEventsByRooms = async (events: any) => {
        const rooms = await Room.find({})
        // @ts-ignore
        return events.filter(event => event?.content?.room && rooms.some(room => room.name === event?.content?.room["_"] || event?.content?.note && room.name ===event?.content?.note["_"]))
    }
    private _extractCourseEvents = async (dataset: any) => {
        try{
            return await this._filterEventsByRooms(dataset)
        }catch (e){
            console.log(e)
        }
    }

    private _extractParallels = async (dataset: any) => {
        try {
            return await this._filterEventsByRooms(dataset)
        }catch (e) {

        }
    }
    getSemester = async (): Promise<SemesterSchema | null> => {
        try {
            const today = new Date();
            const storedSemester = await Semester.findOne({
                from: { $lte: today },
                to: { $gte: today },
            })
            if(storedSemester){
                return storedSemester
            }else{
                const data = await this.handleApiCall({query: `${ApiProviders.KOS_API}${KosApiRoutes.SEMESTER}`})
                const semester = data[0]
                const newSemester = new Semester({
                    name: semester.code,
                    from: new Date(String(semester.startDate)),
                    to: new Date(String(semester.endDate)),
                })
                Semester.updateOne(
                    { name: newSemester.name },
                    {
                        $setOnInsert: newSemester,
                    },
                    { upsert: true }
                )
                    .then((result) => {
                        if (result.upsertedId) {
                            console.log('Záznam byl vložen:', result.upsertedId);
                        } else {
                            console.log('Záznam již existuje:', newSemester.name);
                        }
                    })
                    .catch((error) => {
                        console.error('Chyba při vkládání záznamu:', error);
                    });

                return newSemester
            }
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call getSemester ::', error?.message);
            return null;
        }
    }

    getAvailableRooms = async () => {
        try{
            return await Room.find({})
        }catch (error: any) {
            console.log(`Error at reading from DB getAvailableRooms::`, error?.message)
            return null
        }

    }
    getParallels = async (semester: string = "B231") => {
        try {
            let offset = 0
            // timetableSlot.room.code==T9:602
            const res = await this.handleApiCall({query: `${ApiProviders.KOS_API}${KosApiRoutes.PARALLELS}?includeInvalidSlots=false&limit=${LIMIT}&offset=${offset}&query=semester==${semester}`})
            console.log(res[0])
            console.log(res.length)
            return await this._extractParallels(res)
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call getParallels::', error?.message);
            return null;
        }
    }
    getCourseEvent = async (semester: string = "B231") => {
        try {
            const dataset = await this.handleApiCall({query: `${ApiProviders.KOS_API}${KosApiRoutes.COURSE_EVENT}?limit=1000&query=semester==${semester}`})
            return await this._extractCourseEvents(dataset)
        } catch (error: any) {
            // Handle errors
            console.error('Error making API call getCourseEvent:: ', error?.response?.data);
            return null;
        }
    }
}


