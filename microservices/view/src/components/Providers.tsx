import { QueryClientProvider } from "react-query";
import queryClient from "../utils/query-client";
import { GlobalContextProvider } from "../context/GlobalContext";
import Layout from "./Layout";
import { ProvidersProps } from "../types";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";

const Providers = ({
  children,
  transparentFooter,
  isMobile,
}: ProvidersProps) => {
  moment.updateLocale("en", {
    week: {
      dow: 1,
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <LocalizationProvider
          dateAdapter={AdapterMoment}
          localeText={{
            calendarWeekNumberHeaderText: "#",
            calendarWeekNumberText: (weekNumber) => `${weekNumber}.`,
          }}
        >
          <Layout transparentFooter={transparentFooter} isMobile={isMobile}>
            {children}
          </Layout>
        </LocalizationProvider>
      </GlobalContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
