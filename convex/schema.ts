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
    userId: v.string(),
  }).index("by_group_and_user", ["userId", "groupId"]),
});
