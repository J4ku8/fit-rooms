import { useQuery } from "react-query";
import { GraphApiFetch } from "../types";

export const useGetEvents = ({ roomEmail, date }: GraphApiFetch) => {
  return useQuery(
    ["events", roomEmail],
    async () => {
      try {
        const response = await fetch(
          `/api/events?roomEmail=${roomEmail}&date=${date}`,
        );
        if (!response.ok) {
          return [];
        }
        return response.json();
      } catch (error) {
        throw new Error(`Error occured in events fetching: ${error}`);
      }
    },
    { refetchInterval: 5000 },
  );
};
