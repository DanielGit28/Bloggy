
export function Bounded({
  className,
  children,
}: {
  className?: string;
  children: JSX.Element;
}): JSX.Element {
  return (
      <div
        className={"mx-auto w-full max-w-3xl"}
      >
        {children}
      </div>
  );
}
