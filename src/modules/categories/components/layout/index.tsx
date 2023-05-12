import { ReactNode } from "react";
import { ROUTES } from "@/common/routes";
import { ButtonLink } from "@/components/button";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-slate-800">
            Expense categories
          </span>
          <div className="flex items-center">
            <ButtonLink href={ROUTES.CategoriesNew} size="sm">
              Add new category
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export { Layout };
