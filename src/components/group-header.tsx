import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export default function GroupHeader({ groupId }: { groupId: string }) {
  const { data: group, isPending } = useQuery(
    convexQuery(api.groups.get, { groupId: groupId as Id<"groups"> }),
  );

  if (isPending) {
    return <p>Loading group info</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-primary/60">{group?.title}</h1>
    </div>
  );
}
