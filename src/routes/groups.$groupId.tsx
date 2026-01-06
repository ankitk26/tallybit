import ExpenseForm from "@/components/expense-form";
import GroupHeader from "@/components/group-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export const Route = createFileRoute("/groups/$groupId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { groupId } = useParams({ from: "/groups/$groupId" });
  const { data: expenses, isPending } = useQuery(
    convexQuery(api.expenses.getAllByGroup, {
      groupId: groupId as Id<"groups">,
    }),
  );

  if (isPending) {
    return <p>Loading expenses</p>;
  }

  return (
    <div className="space-y-8">
      <GroupHeader groupId={groupId} />

      <Dialog>
        <DialogTrigger>
          <Button>Add expense</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add expense</DialogTitle>
          <ExpenseForm groupId={groupId} />
        </DialogContent>
      </Dialog>

      <div className="flex flex-col space-y-4">
        <h1>Group expenses</h1>
        {expenses?.map((expense) => (
          <div key={expense._id} className="border p-4">
            <h3>{expense.title}</h3>
            <h6>Paid by {expense.paidBy}</h6>
            <h6>Amount paid: {expense.amount}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}
