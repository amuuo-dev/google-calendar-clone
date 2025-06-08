/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";
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
  updateEvent: (id: string, event: UnionType<Event, "id">) => void;
  deleteEvent: (id: string) => void;
};

type EventsProvidersProps = {
  children: React.ReactNode;
};

export const Context = createContext<EventTypeContext | null>(null);

const EventsProviders = ({ children }: EventsProvidersProps) => {
  const [events, setEvents] = useLocalStorage("Events", []);

  function addEvent(eventDetails: UnionType<Event, "id">) {
    setEvents((e) => [...e, { ...eventDetails, id: crypto.randomUUID() }]);
  }

  function updateEvent(id: string, eventDetails: UnionType<Event, "id">) {
    setEvents((e) => {
      return e.map((event) => {
        return event.id === id ? { id, ...eventDetails } : event;
      });
    });
  }

  function deleteEvent(id: string) {
    setEvents((e) => e.filter((event) => event.id !== id));
  }

  return (
    <Context.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </Context.Provider>
  );
};

function useLocalStorage(key: string, initialValue: Event[]) {
  const [value, setValue] = useState<Event[]>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) return initialValue;

    return (JSON.parse(jsonValue) as Event[]).map((event) => {
      if (event.date instanceof Date) return event;
      return { ...event, date: new Date(event.date) };
    });
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

export default EventsProviders;
