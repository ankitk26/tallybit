import { query } from "./_generated/server";

export const check = query({
  args: {},
  handler: () => {
    return {
      message: "Working",
    };
  },
});
