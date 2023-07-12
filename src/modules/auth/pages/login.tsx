import { authenticateAction } from "../actions";
import { LoginForm } from "../components/login-form";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <LoginForm action={authenticateAction} />
    </div>
  );
};

export { Login };
