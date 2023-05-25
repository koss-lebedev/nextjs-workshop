import { getAllCategoriesAPI } from "@/common/api";
import { Button } from "@/components/button";
import { deleteCategoryAction } from "../../actions";

const CategoryTable = async () => {
  const categories = await getAllCategoriesAPI();

  return (
    <div className="overflow-hidden min-w-full">
      <table className="w-full">
        <thead className="border-b">
          <tr className="h-14">
            <th className="text-left text-gray-900 px-6">Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((record) => (
            <tr key={record.id} className="bg-white border-b">
              <td className="px-6 py-4">{record.name}</td>
              <td className="px-6 py-4 text-right">
                <form action={deleteCategoryAction}>
                  <input type="hidden" name="id" value={record.id} />
                  <Button size="sm" type="submit">
                    Delete
                  </Button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { CategoryTable };
