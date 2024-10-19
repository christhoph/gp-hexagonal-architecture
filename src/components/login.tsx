import { useRef } from "react";

import { trpc } from "../trpc";

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { error, mutate } = trpc.login.useMutation();

  const onSubmit = () => {
    if (emailRef.current?.value && passwordRef.current?.value) {
      console.log("[LOGIN] submit data: ", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });

      mutate({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
    }
  };

  return (
    <div>
      {error && <span style={{ color: "#cf000f" }}>{error.message}</span>}

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <label htmlFor="login-email">Email:</label>
        <input
          type="email"
          ref={emailRef}
          id="login-email"
          name="login-email"
        />

        <label htmlFor="login-password">Password:</label>
        <input
          id="login-password"
          name="login-password"
          type="password"
          ref={passwordRef}
        />

        <button type="button" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
