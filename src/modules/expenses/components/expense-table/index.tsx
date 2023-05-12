import Link from "next/link";
import { Category, Expense } from "@prisma/client";
import { ROUTES } from "@/common/routes";
import { Button } from "@/components/button";

type Props = {
  data: Array<Expense & { category: Category }>;
};

const ExpenseTable = ({ data }: Props) => {
  return (
    <div className="overflow-hidden min-w-full">
      <table className="w-full">
        <thead className="border-b">
          <tr className="h-14">
            <th className="text-left text-gray-900 px-6">Expense</th>
            <th className="text-left text-gray-900 px-6">Category</th>
            <th className="text-left text-gray-900 px-6">Cost</th>
            <th className="text-left text-gray-900 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id} className="bg-white border-b">
              <td className="px-6 py-4">
                <Link href={ROUTES.Expense(record.id)}>{record.name}</Link>
              </td>
              <td className="px-6 py-4">{record.category.name}</td>
              <td className="px-6 py-4">${record.cost}</td>
              <td className="px-6 py-4 text-right">
                <Button size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ExpenseTable };
