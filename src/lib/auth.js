import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('mentorify');

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  }, 
  plugins:[
    nextCookies()
  ],
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});