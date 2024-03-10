import { useQuery } from "react-query";
import { GraphApiFetch } from "../types";

export const useGetCalendar = ({ roomEmail }: GraphApiFetch) => {
  return useQuery(
    ["calendar", roomEmail],
    async () => {
      try {
        const response = await fetch(`/api/calendar?roomEmail=${roomEmail}`);

          if (!response.ok) {
          return [];
        }
        return response.json();
      } catch (error) {
        throw new Error(`Error occured in events fetching: ${error}`);
      }
    },
    { refetchInterval: 120000 },
  );
};
