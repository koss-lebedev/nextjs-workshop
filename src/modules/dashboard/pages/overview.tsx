import { getAllCategories } from "@/modules/categories/service";
import { getGroupedExpenses } from "@/modules/expenses/service";
import { Chart } from "../components/chart";

const Overview = async () => {
  const groupedExpenses = await getGroupedExpenses();
  const categories = await getAllCategories();

  const data = [
    ["Category", "Amount spent"],
    ...groupedExpenses.map((record) => [
      categories.find((c) => c.id === record.categoryId)?.name,
      record._sum.cost || 0,
    ]),
  ];

  return (
    <div className="m-4 border p-4 rounded bg-white">
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={{
          pieHole: 0.3,
        }}
      />
    </div>
  );
};

export { Overview };
