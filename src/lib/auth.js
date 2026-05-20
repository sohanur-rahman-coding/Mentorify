import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("mentorify");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  session: {
    strategy: "jwt",
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
    },
  },

  accountLinking: {
    enabled: true,
    trustedProviders: ["google", "github"],
  },

  plugins: [jwt(), nextCookies()],
});
