import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  groups: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    adminId: v.string(),
  }).index("by_admin", ["adminId"]),

  groupMembers: defineTable({
    groupId: v.id("groups"),
    memberEmail: v.string(),
  }).index("by_group_and_member", ["memberEmail", "groupId"]),

  expenses: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    amount: v.number(),
    currency: v.string(),
    expenseTime: v.number(),
    paidBy: v.string(),
    groupId: v.id("groups"),
    expenseSplitStrategy: v.union(v.literal("equal"), v.literal("individual")),
  }).index("by_group", ["groupId"]),

  expenseMembers: defineTable({
    expenseId: v.id("expenses"),
    memberEmail: v.string(),
    amountOwed: v.number(),
    isSettled: v.boolean(),
  }).index("by_expense_and_member", ["expenseId", "memberEmail"]),
});
