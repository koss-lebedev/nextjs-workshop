import { ExpenseTable } from "@/modules/expenses/components/expense-table";
import { getAllExpenses } from "../service";
import { deleteExpenseAction } from "../actions";
import { requireUser } from "@/modules/auth/service";

const ExpenseList = async () => {
  const user = await requireUser();
  const expenses = await getAllExpenses(user.id);

  return (
    <div>
      <ExpenseTable data={expenses} onDelete={deleteExpenseAction} />
    </div>
  );
};

export { ExpenseList };
