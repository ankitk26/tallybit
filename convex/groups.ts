import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return [];
    }
    const groupsHavingUserAsMember = await ctx.db
      .query("groupMembers")
      .withIndex("by_group_and_member", (q) =>
        q.eq("memberEmail", user.email ?? user.subject),
      )
      .collect();

    const groupsList = await Promise.all(
      groupsHavingUserAsMember.map((group) => ctx.db.get(group.groupId)),
    );
    return groupsList;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    groupMemberEmails: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return null;
    }
    const groupId = await ctx.db.insert("groups", {
      adminId: user.subject,
      title: args.title,
      description: args.description,
    });
    await ctx.db.insert("groupMembers", {
      groupId,
      memberEmail: user.email ?? user.subject,
    });
    await Promise.all(
      args.groupMemberEmails.map((email) =>
        ctx.db.insert("groupMembers", {
          groupId,
          memberEmail: email,
        }),
      ),
    );
  },
});
