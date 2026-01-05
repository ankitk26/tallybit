import { Button } from "@/components/ui/button";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { IconLoader } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  const { data, isPending } = useQuery(convexQuery(api.health.check));

  if (isPending) {
    return <IconLoader className="animate-spin" />;
  }

  return (
    <div>
      <Button
        onClick={async () =>
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                location.reload();
              },
            },
          })
        }
      >
        Log out
      </Button>
      <pre>{JSON.stringify(data)}</pre>
      <Button variant="default">Click here</Button>
    </div>
  );
}
