import { ReactNode } from "react";
import { ROUTES } from "@/common/routes";
import { ButtonLink } from "@/components/button";
import { getTotalExpenses } from "../../service";

type Props = {
  children: ReactNode;
};

const ExpenseLayout = async ({ children }: Props) => {
  const total = await getTotalExpenses();

  return (
    <div>
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-slate-800">
            My expenses{" "}
            <span className="bg-cyan-600 rounded-lg px-2 py-1 text-white font-bold">
              ${total}
            </span>
          </span>
          <div className="flex items-center">
            <ButtonLink href={ROUTES.ExpensesNew} size="sm">
              Add new expense
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export { ExpenseLayout };
