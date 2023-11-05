import { format, parseISO } from "date-fns";
import Button from "./Button";

function EventCard({ event, onSelect, mode }) {
  const startTime = format(parseISO(event.startTime), "h:mm a");
  const endTime = format(parseISO(event.endTime), "h:mm a");
  return (
    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-300 shadow-sm w-52 flex items-center h-40">
      <div className="text-3xl font-semibold uppercase">
        {event.category[0]}
      </div>
      <div className="h-full border-r border-neutral-800 mx-4" />
      <div className="h-full w-full flex flex-col">
        <div className="text-xl font-medium text-neutral-700">{event.name}</div>
        <div className="text-neutral-600 text-xs mt-1">
          <span className="capitalize">({event.category})</span>
          <div className="font-medium">
            {startTime} - {endTime}
          </div>
        </div>
        <Button className="w-full mt-auto" onClick={onSelect}>
          {mode === "register" ? "Register" : "Un Register"}
        </Button>
      </div>
    </div>
  );
}

export default EventCard;
