import { ExpenseTable } from "@/modules/expenses/components/expense-table";
import { getAllExpenses } from "../service";
import { deleteExpenseAction } from "../actions";

const ExpenseList = async () => {
  const expenses = await getAllExpenses();

  return (
    <div>
      <ExpenseTable data={expenses} onDelete={deleteExpenseAction} />
    </div>
  );
};

export { ExpenseList };
