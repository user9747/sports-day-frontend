import classNames from "classnames";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={classNames(
        "rounded-md h-9 border border-neutral-300 w-full px-2 mt-2 text-sm text-neutral-700",
        className
      )}
      {...props}
    />
  );
};

export default Input;
