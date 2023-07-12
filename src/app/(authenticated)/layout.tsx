import { Sidebar } from "@/components/sidebar";
import { requireUser } from "@/modules/auth/service";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = async ({ children }: Props) => {
  await requireUser();

  return (
    <>
      {/* @ts-ignore RSC */}
      <Sidebar />
      <main className="h-full w-full min-h-screen bg-slate-50 relative overflow-y-auto ml-64">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
