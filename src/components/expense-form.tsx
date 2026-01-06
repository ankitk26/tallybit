import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export default function ExpenseForm({ groupId }: { groupId: string }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);

  const createExpenseMutation = useMutation({
    mutationFn: useConvexMutation(api.expenses.create),
  });

  function createExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    createExpenseMutation.mutate({
      amount,
      title,
      groupId: groupId as Id<"groups">,
    });
  }

  return (
    <form onSubmit={createExpense}>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
