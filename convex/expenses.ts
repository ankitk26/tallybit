import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllByGroup = query({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return null;
    }

    const group = await ctx.db.get(args.groupId);
    if (!group) {
      throw new ConvexError("Invalid request");
    }

    const groupMember = await ctx.db
      .query("groupMembers")
      .withIndex("by_group_and_member", (q) =>
        q.eq("memberEmail", user.email ?? "").eq("groupId", args.groupId),
      )
      .collect();

    if (!groupMember) {
      throw new ConvexError("Invalid request");
    }

    const groupExpenses = await ctx.db
      .query("expenses")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .collect();

    return groupExpenses;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    amount: v.number(),
    groupId: v.id("groups"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return null;

    const group = await ctx.db.get(args.groupId);
    if (!group) {
      throw new ConvexError("Invalid request");
    }

    const groupMember = await ctx.db
      .query("groupMembers")
      .withIndex("by_group_and_member", (q) =>
        q.eq("memberEmail", user.email ?? "").eq("groupId", args.groupId),
      )
      .collect();

    if (!groupMember) {
      throw new ConvexError("Invalid request");
    }

    await ctx.db.insert("expenses", {
      amount: args.amount,
      title: args.title,
      currency: "INR",
      expenseSplitStrategy: "equal",
      groupId: args.groupId,
      paidBy: user.subject,
      expenseTime: Date.now(),
    });
  },
});
