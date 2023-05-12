import { Button } from "@/components/button";
import { TextInput } from "@/components/form/text-input";

const CategoryForm = () => {
  return (
    <form className="max-w-xs">
      <TextInput name="name" label="Category name" required />
      <Button type="submit" block>
        Create
      </Button>
    </form>
  );
};

export { CategoryForm };
