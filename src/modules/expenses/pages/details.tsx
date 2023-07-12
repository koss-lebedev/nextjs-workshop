import { notFound } from "next/navigation";
import { getExpense } from "../service";
import { requireUser } from "@/modules/auth/service";

type Props = {
  params: {
    id: string;
  };
};

const ExpenseDetails = async ({ params }: Props) => {
  const user = await requireUser();
  const expense = await getExpense(params.id);

  if (!expense || expense.userId !== user.id) {
    return notFound();
  }

  return (
    <dl>
      <dt className="font-bold">Name</dt>
      <dd className="mb-2">{expense.name}</dd>
      <dt className="font-bold">Cost</dt>
      <dd className="mb-2">${expense.cost}</dd>
      <dt className="font-bold">Category</dt>
      <dd className="mb-2">{expense.category.name}</dd>
    </dl>
  );
};

export { ExpenseDetails };
