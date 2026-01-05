import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";

export default function GroupForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);

  const createGroupMutation = useMutation({
    mutationFn: useConvexMutation(api.groups.create),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedEmail = emailInput.trim().replace(/,$/, "");

      // Basic email regex validation could be added here
      if (trimmedEmail && !emails.includes(trimmedEmail)) {
        setEmails([...emails, trimmedEmail]);
        setEmailInput("");
      }
    } else if (e.key === "Backspace" && !emailInput && emails.length > 0) {
      removeEmail(emails.length - 1);
    }
  };

  const removeEmail = (indexToRemove: number) => {
    setEmails(emails.filter((_, index) => index !== indexToRemove));
  };

  function createGroup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createGroupMutation.mutate({
      description,
      title,
      groupMemberEmails: emails,
    });
  }

  return (
    <form
      onSubmit={createGroup}
      className="grid w-full max-w-lg gap-6 p-6 border rounded-xl shadow-sm bg-card"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Group Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Engineering Team"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Members</Label>
        <div className="flex flex-wrap gap-2 p-2 min-h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          {emails.map((email, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="pl-2 pr-1 py-1 flex items-center gap-1 animate-in fade-in zoom-in duration-200"
            >
              {email}
              <button
                type="button"
                onClick={() => removeEmail(index)}
                className="ml-1 rounded-full outline-none hover:bg-muted p-0.5"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {email}</span>
              </button>
            </Badge>
          ))}
          <input
            className="flex-1 min-w-37.5 bg-transparent py-1 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              emails.length === 0 ? "Enter emails separated by commas..." : ""
            }
          />
        </div>
        <p className="text-[0.8rem] text-muted-foreground">
          Tip: Type an email and press Enter or Comma.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          className="min-h-25"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this group for?"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={createGroupMutation.isPending || !title}
      >
        {createGroupMutation.isPending ? "Creating Group..." : "Create Group"}
      </Button>
    </form>
  );
}
