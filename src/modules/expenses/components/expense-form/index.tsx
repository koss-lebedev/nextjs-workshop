"use client";

import { useForm } from "react-hook-form";
import { Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/components/form/text-input";
import { Button } from "@/components/button";
import { SelectInput } from "@/components/form/select-input";
import { CreateExpenseSchema, createExpenseSchema } from "../../schemas";

type Props = {
  onCreate: (values: CreateExpenseSchema) => Promise<void>;
  categories: Category[];
};

const ExpenseForm = ({ onCreate, categories }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateExpenseSchema>({
    resolver: zodResolver(createExpenseSchema),
  });

  return (
    <form className="max-w-xs">
      <TextInput
        label="Name"
        error={errors.name?.message}
        {...register("name")}
      />

      <TextInput
        label="Cost"
        type="number"
        error={errors.cost?.message}
        {...register("cost", { valueAsNumber: true })}
      />

      <SelectInput
        label="Category"
        options={categories}
        error={errors.categoryId?.message}
        {...register("categoryId")}
      />

      <Button type="submit" block>
        Create expense
      </Button>
    </form>
  );
};

export { ExpenseForm };
