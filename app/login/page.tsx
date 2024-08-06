"use client";

import { useFormStatus } from "react-dom";
import { login, signup } from "./actions";

function SubmitButton({
  children,
  action,
}: {
  children: React.ReactNode;
  action: any;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" formAction={action} disabled={pending}>
      {children}
    </button>
  );
}

export default function LoginPage() {
  return (
    <form className="flex flex-col mx-auto gap-4">
      <label htmlFor="email">
        Email:
        <input id="email" name="email" type="email" required />
      </label>
      <label htmlFor="password">
        Password:
        <input id="password" name="password" type="password" required />
      </label>
      <SubmitButton action={login}>Log in</SubmitButton>
      <SubmitButton action={signup}>Sign up</SubmitButton>
    </form>
  );
}
