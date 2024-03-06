import { useQuery } from "react-query";
import { GraphApiFetch } from "../types";

export const useGetEvents = ({ roomEmail }: GraphApiFetch) => {
  return useQuery(
    ["events", roomEmail],
    async () => {
      try {
        const response = await fetch(`/api/events?roomEmail=${roomEmail}`);
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
