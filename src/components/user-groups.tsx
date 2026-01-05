import { convexQuery } from "@convex-dev/react-query";
import { IconLoader } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import GroupForm from "./group-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function UserGroups() {
  const { data, isPending } = useQuery(
    convexQuery(api.groups.getForCurrentUser, {}),
  );

  if (isPending) {
    return <IconLoader className="animate-spin" />;
  }

  return (
    <div>
      <h1>Your groups</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <Dialog>
        <DialogTrigger>
          <Button>Create group</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>New group</DialogTitle>
          <div>
            <GroupForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
