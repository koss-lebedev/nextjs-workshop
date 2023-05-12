import { ExpenseForm } from "../components/expense-form";

const NewExpense = () => {
  return (
    <div>
      <h1>New Expense</h1>
      <ExpenseForm categories={[]} />
    </div>
  );
};

export { NewExpense };
