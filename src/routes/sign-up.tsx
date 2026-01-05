import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    console.log(data, error);
    navigate({ to: "/" });
  }

  return (
    <div>
      <h1>Hello "/sign-up"!</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="Name"
        />
        <Button type="submit">Sign up</Button>
      </form>

      <Link to="/">
        <Button variant="outline">Log in here</Button>
      </Link>
    </div>
  );
}
