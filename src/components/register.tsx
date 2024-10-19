import { useRef } from "react";

import { trpc } from "../trpc";

export function Register() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { error, mutate } = trpc.register.useMutation();

  const onSubmit = () => {
    if (
      nameRef.current?.value &&
      emailRef.current?.value &&
      passwordRef.current?.value
    ) {
      console.log("[REGISTER] submit data: ", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });

      mutate({
        name: nameRef.current?.value,
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
        <label htmlFor="register-name">Name:</label>
        <input id="register-name" name="name" type="text" ref={nameRef} />

        <label htmlFor="register-email">Email:</label>
        <input
          type="email"
          ref={emailRef}
          id="register-email"
          name="register-email"
        />

        <label htmlFor="register-password">Password:</label>
        <input
          type="password"
          ref={passwordRef}
          id="register-password"
          name="register-password"
        />

        <button type="button" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
