/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";
import { type UnionType } from "../utilis/types";
import type { EVENT_COLORS } from "./useEvent";

export type Event = {
  id: string;
  name: string;
  date: Date;
  color: (typeof EVENT_COLORS)[number];
} & (
  | {
      allDay: false;
      startTime: string;
      endTime: string;
    }
  | { allDay: true; startTime?: never; endTime?: never }
);

type EventTypeContext = {
  events: Event[];
  addEvent: (event: UnionType<Event, "id">) => void;
};

type EventsProvidersProps = {
  children: React.ReactNode;
};

export const Context = createContext<EventTypeContext | null>(null);

const EventsProviders = ({ children }: EventsProvidersProps) => {
  const [events, setEvents] = useState<Event[]>([]);

  function addEvent(event: UnionType<Event, "id">) {
    setEvents((e) => [...e, { ...event, id: crypto.randomUUID() }]);
  }

  return (
    <Context.Provider value={{ events, addEvent }}>{children}</Context.Provider>
  );
};

export default EventsProviders;
