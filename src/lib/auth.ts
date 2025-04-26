import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/get-session" && ctx.context.session?.user) {
        const userEmail = ctx.context.session.user.email;
        if (!userEmail.endsWith("@gandhinagaruni.ac.in")) {
          await ctx.context.internalAdapter.deleteSession(
            ctx.context.session.session.token,
          );

          redirect("/");
        }
      }
    }),
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/get-session" && ctx.context.session?.user) {
        const userEmail = ctx.context.session.user.email;

        if (!userEmail.endsWith("@gandhingar.un.ac")) {
          throw new APIError("FORBIDDEN", {
            message: "Only @gandhingar.un.ac emails are allowed.",
          });
        }
      }
    }),
  },
});
