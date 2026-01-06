import LogoutButton from "@/components/logout-button";
import UserGroups from "@/components/user-groups";
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
      <LogoutButton />
      <UserGroups />
    </div>
  );
}
