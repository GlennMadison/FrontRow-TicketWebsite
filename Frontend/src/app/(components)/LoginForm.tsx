"use client";

import { login } from "@/action";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);
  
  return (
    <form action={formAction}>
      <input type="text" name="email" required placeholder="email" className="m-5" />
      <input type="password" name="password" required placeholder="password" />
      <button className="bg-red-500">Login</button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
};

export default LoginForm;