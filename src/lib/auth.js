import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import bcrypt from "bcrypt"; // Assuming bcrypt for password hashing
import GoogleProvider from "next-auth/providers/google"


export const authOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Handle missing credentials
        }

        try {
          const existingUser = await db.user.findUnique({
            where: { email: credentials?.email },
          });
          if (!existingUser) {
            return null; // User not found
          }
          
          if(existingUser.password){
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );
            if (!passwordMatch) {
              return null; // Incorrect password
            }
          }

          return {
            id: existingUser.id,
            username: existingUser.username,
            email:existingUser.email,
          }; // Return only ID and username
        } catch (error) {
          console.error("Error during authorization:", error);
          return null; // Handle database or other errors
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token,user}){
        console.log(token, user);
        if(user) {
            return {
                ...token,
                username:user.username
            }
        }
        return token
    },
    async session({session, user,token } ){
        console.log(session, user, token);
        return{
            ...session,
            user:{
                ...session.user,
                username: token.username
            }
        }
    },
  }
};


// import { PrismaAdapter } from "@auth/prisma-adapter"
// import GoogleProvider from "next-auth/providers/google"
// import prisma from "./connect"

// export const authOptions ={
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_SECRET,
//         }),
//     ]
// }