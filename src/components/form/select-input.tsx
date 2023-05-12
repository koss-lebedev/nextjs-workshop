import clsx from "clsx";
import { ComponentPropsWithoutRef, Ref, forwardRef } from "react";

type Props = {
  error?: string;
  label: string;
  options: Array<{ id: string; name: string }>;
} & ComponentPropsWithoutRef<"select">;

const SelectInput = forwardRef(
  ({ label, error, options, ...props }: Props, ref: Ref<HTMLSelectElement>) => {
    return (
      <div className="mb-3">
        <label className="text-sm font-bold mb-2" htmlFor={props.name}>
          {label}
        </label>
        <select
          className={clsx(
            "w-full rounded-md border-2 bg-white p-3",
            error ? "border-red-500 outline-red-500" : "border-gray-200"
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

export { SelectInput };
