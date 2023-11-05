import { useMemo } from "react";
import EventCard from "../../components/EventCard";
import { useAuth } from "../../context/AuthContext";
import {
  useGetEvents,
  useGetRegisteredEvents,
  useRegisterEvent,
  useUnRegisterEvent,
} from "./apis";
import { toast } from "react-toastify";
import { validateEventOverlap } from "../../utils";

function Home() {
  const auth = useAuth();
  const eventsQuery = useGetEvents();
  const registeredEventsQuery = useGetRegisteredEvents();
  const registerEventMutation = useRegisterEvent();
  const unRegisterEventMutation = useUnRegisterEvent();

  const onRegister = (event) => {
    if (registeredEventsQuery?.data?.length === 3) {
      toast.warn("You can only register for a maximum of 3 events");
      return;
    }
    const overlap = validateEventOverlap(event, registeredEventsQuery?.data);
    if (overlap) {
      toast.warn(`${event.name} timing overlaps with ${overlap.name}`);
      return;
    }

    registerEventMutation.mutate(event.id);
  };

  const onUnRegister = (eventId) => {
    unRegisterEventMutation.mutate(eventId);
  };

  const filteredEvents = useMemo(() => {
    return eventsQuery?.data?.filter(
      (event) =>
        !registeredEventsQuery.data?.map((re) => re.id)?.includes(event.id)
    );
  }, [eventsQuery?.data, registeredEventsQuery.data]);
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-medium text-neutral-800">
        Hi {auth.appState.userName},
      </h1>
      <div className="text-base mt-2 text-neutral-600">
        Welcome to Sports days event registration portal. You can use the below
        platform to register for events.
      </div>
      <div className="flex mt-8 flex-col sm:flex-row gap-6 flex-1 max-h-[38rem]">
        <div className="flex-1 border p-4 rounded-md">
          <h2 className="text-neutral-600 font-medium text-xl">Events</h2>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 h-[91%] overflow-auto"
            style={{
              gridTemplateRows: "auto 1fr",
            }}
          >
            {filteredEvents?.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={() => onRegister(event)}
                mode="register"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 border p-4 rounded-md">
          <h2 className="text-neutral-600 font-medium text-xl">
            Registered Events ({registeredEventsQuery?.data?.length || 0})
          </h2>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  mt-4 h-[91%] overflow-auto"
            style={{
              gridTemplateRows: "auto 1fr",
            }}
          >
            {registeredEventsQuery?.data?.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={() => onUnRegister(event.id)}
                mode="unregister"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
