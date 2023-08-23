"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  browserSupportsWebAuthn,
  startAuthentication,
} from "@simplewebauthn/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { TextInput } from "@/components/form/text-input";
import { Button } from "@/components/button";
import { ROUTES } from "@/common/routes";
import { LoginSchema, loginSchema } from "../schemas";
import { authenticateAction } from "../actions";

type Props = {
  action: typeof authenticateAction;
};

const LoginForm = ({ action }: Props) => {
  const passkeySupported = useMemo(() => browserSupportsWebAuthn(), []);

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

  const onPasskeyAuth = async () => {
    const response = await fetch("/api/passkeys/authenticate", {
      cache: "no-cache",
    });
    const options = await response.json();
    console.log(options);

    const credential = await startAuthentication(options);

    console.log(credential);

    await fetch("/api/passkeys/authenticate", {
      method: "POST",
      body: JSON.stringify(credential),
    });

    router.push(ROUTES.Dashboard);
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
      {passkeySupported && (
        <>
          <div className="text-center my-2">or</div>
          <Button type="button" block onClick={onPasskeyAuth}>
            Log in with passkey
          </Button>
        </>
      )}
    </form>
  );
};

export { LoginForm };
