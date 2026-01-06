import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
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
  );
}
