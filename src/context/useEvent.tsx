import { useContext } from "react";
import { Context } from "./Events";

export const EVENT_COLORS = ["red", "green", "blue"] as const;

export function useEvent() {
  const value = useContext(Context);
  if (value == null) {
    throw new Error("useEvents should be used within an EventProvider");
  }
  return value;
}
