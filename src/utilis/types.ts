export const EVENT_COLORS = ["red", "blue", "green"] as const;

export type UnionType<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
