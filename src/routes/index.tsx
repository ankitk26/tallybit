import { Button } from "@/components/ui/button";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { IconLoader } from "@tabler/icons-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending } = useQuery(convexQuery(api.health.check));

  if (isPending) {
    return <IconLoader className="animate-spin" />;
  }

  return (
    <div>
      <pre>{JSON.stringify(data)}</pre>
      <Button variant="default">Click here</Button>
    </div>
  );
}
