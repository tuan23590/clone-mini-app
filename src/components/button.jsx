export default function Button({
  className,
  primary,
  small,
  large,
  ...props
}) {
  return (
    <button
      className={`${
        primary ? "bg-primary text-white" : "bg-secondary"
      } text-base font-medium rounded-lg ${
        large ? "px-6 py-3.5" : small ? "px-3 py-[7px]" : "px-6 py-2.5"
      } disabled:opacity-50 ${className ?? ""}`}
      {...props}
    />
  );
}
