"use client";

import { Button } from "@/components/button";
import { TextInput } from "@/components/form/text-input";
import { authenticateAction } from "../actions";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/common/routes";

type Props = {
  action: typeof authenticateAction;
};

const LoginForm = ({ action }: Props) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (values: LoginSchema) => {
    const result = await action(values);
    if (result.error) {
      setError("root", { message: result.error });
    } else {
      router.push(ROUTES.Dashboard);
    }
  };

  return (
    <form className="w-72" onSubmit={handleSubmit(onSubmit)}>
      <p className="bg-red-100 p-2 text-red-700 text-center empty:hidden">
        {errors.root?.message}
      </p>
      <TextInput
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <TextInput
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />
      <Button type="submit" block>
        Log in
      </Button>
    </form>
  );
};

export { LoginForm };
