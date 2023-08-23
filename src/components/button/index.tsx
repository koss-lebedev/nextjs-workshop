import type { ElementType, ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import Link from "next/link";

type ButtonProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  treatAs?: T;
  block?: boolean;
  size?: "sm" | "md";
};

const ButtonLike = <T extends ElementType>({
  children,
  block,
  treatAs,
  size,
  className,
  ...props
}: ButtonProps<T>) => {
  const Comp = treatAs || "button";

  return (
    <Comp
      className={clsx(
        "bg-cyan-600 hover:bg-cyan-500 text-white hover:shadow-md hover:shadow-cyan-400/30",
        "rounded-md px-4 py-3 transition-all inline-block text-center",
        block && "w-full",
        size === "sm" && `px-2 py-1 text-sm`,
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

const Button = (props: ButtonProps<"button">) => (
  <ButtonLike treatAs="button" {...props} />
);

const ButtonLink = (props: ButtonProps<typeof Link>) => (
  <ButtonLike treatAs={Link} {...props} />
);

export { Button, ButtonLink };
