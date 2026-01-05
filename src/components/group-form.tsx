import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";

export default function GroupForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createGroupMutation = useMutation({
    mutationFn: useConvexMutation(api.groups.create),
  });

  function createGroup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    createGroupMutation.mutate({
      description,
      title,
    });
  }

  return (
    <form onSubmit={createGroup}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Group title"
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Group description"
      />
      <Button type="submit">Create</Button>
    </form>
  );
}
