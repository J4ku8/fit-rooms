import {ApiProviders, KosApiRoutes, SemesterSchema} from '../../utils/types';
import CvutApiHandler from './CvutApiHandler';
import {LIMIT} from '../../utils/constants';
import Semester from '../../db/model/semester';
import Room from '../../db/model/room';

export class KosApiClient extends CvutApiHandler {
  private _filterEventsByRooms = async (events: any) => {
    const rooms = await Room.find({});
    return events?.filter(
      (event: any) =>
        event?.content?.room &&
        rooms.some(
          (room: any) => {
            return room.displayName === event?.content?.room['_'] ||
                (event?.content?.note &&
                    room.displayName === event?.content?.note['_']);
          }
        )
    );
  };
  private _extractCourseEvents = async (dataset: any) => {
    try {
      return await this._filterEventsByRooms(dataset);
    } catch (e) {
      console.log(e);
    }
  };
  getAvailableRooms = async () => {
    try {
      return await Room.find({});
    } catch (error: any) {
      console.log(
        `Error at reading from DB getAvailableRooms::`,
        error?.message
      );
      return null;
    }
  };

  getSemester = async (): Promise<SemesterSchema> => {
    try {
      const today = new Date();
      const storedSemester = await Semester.findOne({
        from: { $lte: today },
        to: { $gte: today },
      });
      if (storedSemester) {
        return storedSemester;
      } else {
        const data: any = await this.handleApiCall({
          query: `${ApiProviders.KOS_API}${KosApiRoutes.SEMESTER}`,
        });
        const semesterJSON = {
          name: data.code,
          from: new Date(String(data.startDate)),
          to: new Date(String(data.endDate)),
        }
        const newSemester = new Semester(semesterJSON);
        Semester.updateOne(
          { name: newSemester.name },
          {
            $setOnInsert: newSemester,
          },
          { upsert: true }
        )
          .then((result: any) => {
            if (result.upsertedId) {
              console.log('Záznam byl vložen:', result.upsertedId);
            } else {
              console.log('Záznam již existuje:', newSemester.name);
            }
          })
          .catch((error: any) => {
            console.error('Chyba při vkládání záznamu:', error);
          });
        return newSemester;
      }
    } catch (error: any) {
      // Handle errors
      console.error('Error making API call getSemester ::', error?.message);
      const now = new Date();
      const endOfSemester = new Date(now.getMonth() + 3);
      return { from: now, to: endOfSemester, name: '' };
    }
  };
  getParallels = async (semester: string) => {
    try {
      const rooms = await this.getAvailableRooms();
      const queryString = rooms?.filter((room: any) => {
        const roomName = room.displayName as string;
        return !roomName.toLowerCase().includes("test") && room
      })
          ?.map((room: any) => room.displayName)
        .map((roomName: string) => `timetableSlot/room.code==${roomName}`)
        .join(',');


      const res = await this.handleApiCall({
        query: `${ApiProviders.KOS_API}${KosApiRoutes.PARALLELS}?offset=0&limit=${LIMIT}&query=semester==${semester} and (${queryString})`,
      });

      return res?.map((parallel) => {
        const { content, author } = parallel || {};
        const contentObject: any = content;
        const authorObject: any = author;
        return ({
          ...contentObject,
          author: {...authorObject}
        });
      });
    } catch (error: any) {
      // Handle errors
      console.error('Error making API call getParallels::', error?.message);
      return null;
    }
  };

  getExams = async (semester: string) => {
    try {
      const exams = await this.handleApiCall({
        query: `${ApiProviders.KOS_API}${KosApiRoutes.EXAMS}?limit=${LIMIT}&offset=0&query=semester==${semester}`,
      });
      return exams?.map((exam) => {
        const { content, author } = exam || {};
        const contentObject: any = content;
        const authorObject: any = author;
        return ({
          ...contentObject,
          author: {...authorObject}
        });
      });
    } catch (error: any) {
      // Handle errors
      console.error('Error making API call getExams::', error?.message);
      return null;
    }
  };

  getCourseEvent = async (semester: string) => {
    try {
      const courseEvents = await this.handleApiCall({
        query: `${ApiProviders.KOS_API}${KosApiRoutes.COURSE_EVENT}?offset=0&limit=1000&query=semester==${semester}`,
      });
      const filteredDCourseEvents = await this._extractCourseEvents(courseEvents)
      return filteredDCourseEvents?.map((event: any) => {
        const { content, author } = event || {};
        return ({
          ...content,
          author: {...author}
        });
      });
    } catch (error: any) {
      // Handle errors
      console.error(
        'Error making API call getCourseEvent:: ',
        error?.response?.data
      );
      return null;
    }
  };
}
