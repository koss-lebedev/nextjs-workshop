import { Button } from "@/components/button";
import { TextInput } from "@/components/form/text-input";
import { addCategoryAction } from "../../actions";

const CategoryForm = () => {
  return (
    <form className="max-w-xs" action={addCategoryAction}>
      <TextInput name="name" label="Category name" required />
      <Button type="submit" block>
        Create
      </Button>
    </form>
  );
};

export { CategoryForm };
