import { getAllCategories } from "@/modules/categories/service";
import { ExpenseForm } from "../components/expense-form";
import { createExpenseAction } from "../actions";

const NewExpense = async () => {
  const categories = await getAllCategories();

  return (
    <div>
      <h1>New Expense</h1>
      <ExpenseForm categories={categories} onCreate={createExpenseAction} />
    </div>
  );
};

export { NewExpense };
