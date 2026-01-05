import { Button } from "@/components/ui/button";
import UserGroups from "@/components/user-groups";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
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

      <UserGroups />

      <Button variant="default">Click here</Button>
    </div>
  );
}
