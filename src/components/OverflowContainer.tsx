import React from "react";

type OverflowContainerProps<T> = {
  items: T[];
  renderItems: (item: T) => React.ReactNode;
  renderOverflow: (overflowAmount: number) => React.ReactNode;
  getKey: (item: T) => React.Key;
  className?: string;
};

export function OverflowContainer<T>({
  items,
  renderItems,
  renderOverflow,
  getKey,
  className,
}: OverflowContainerProps<T>) {
  return (
    <>
      <div className={className}>
        {items.map((item) => (
          <div key={getKey(item)}>{renderItems(item)}</div>
        ))}
      </div>
      <div>{renderOverflow(overflowAmount)}</div>
    </>
  );
}
