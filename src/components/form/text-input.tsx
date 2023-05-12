import clsx from "clsx";
import { ComponentPropsWithoutRef, Ref, forwardRef } from "react";

type Props = {
  error?: string;
  label: string;
} & ComponentPropsWithoutRef<"input">;

const TextInput = forwardRef(
  ({ label, error, ...props }: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="mb-3">
        <label className="text-sm font-bold mb-2" htmlFor={props.name}>
          {label}
        </label>
        <input
          className={clsx(
            "w-full rounded-md border-2 bg-white p-3",
            error ? "border-red-500 outline-red-500" : "border-gray-200"
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

export { TextInput };
