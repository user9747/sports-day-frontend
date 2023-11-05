import classNames from "classnames";

function Button({ className, children, ...props }) {
  return (
    <button
      className={classNames(
        "bg-neutral-900 rounded-md h-9 text-white font-medium text-sm w-full px-3 hover:bg-neutral-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
