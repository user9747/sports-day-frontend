import { areIntervalsOverlapping, parseISO } from "date-fns";

export const LOCALSTORAGE_KEYS = {
  TOKEN: "sportsday.token",
  USERNAME: "sportsday.userName",
  ROLE: "sportsday.role",
};
export const removeFromLocalStorage = () => {
  localStorage.removeItem(LOCALSTORAGE_KEYS.TOKEN);
  localStorage.removeItem(LOCALSTORAGE_KEYS.ROLE);
  localStorage.removeItem(LOCALSTORAGE_KEYS.USERNAME);
};

export const validateEventOverlap = (newEvent, events) => {
  const eventInterval = {
    start: parseISO(newEvent.startTime),
    end: parseISO(newEvent.endTime),
  };
  return events?.find((e) =>
    areIntervalsOverlapping(eventInterval, {
      start: parseISO(e.startTime),
      end: parseISO(e.endTime),
    })
  );
};
