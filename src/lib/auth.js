import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import bcryptjs from "bcryptjs"; // Assuming bcrypt for password hashing
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

          // if (!existingUser.active) {
          //   throw new Error('User is not active'); 
          // }

          
          
          if(existingUser.password){
            const passwordMatch = await bcryptjs.compare(
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
    async jwt({ token,user, session,trigger}){
        console.log(token, user, session);
        if (trigger === "update") {
          if (session?.name) {
              token.name = session.name;
          }
          if (session?.username) {
              token.username = session.username;
          }
          if (session?.email) {
            token.email = session.email;
          }
          // if (session?.image) {
          //   token.image = session.image;
          // }
      }
        if(user) {
            return {
                ...token,
                username:user.username,
                // role: user.role,          
                
                
            }
        }

        // update user in database 
        const newUser = await db.user.update({
          where: {
            email: token.email,
          },
          data:{
            name:token.name,
            username:token.username,
            email:token.email,
            // image:token.image,
            role:token.role,



          },
        })
        console.log("newUser");

        return token
    },
    async session({session, user,token } ){
        console.log(session, user, token);
        return{
            ...session,
            user:{
                ...session.user,
                username: token.username,
                name:token.name,
                email:token.email,
                // image:token.image,
                role:token.role,



                // role: token.role,

            }
        }
    },
  }
};

// export const getServerSession = () => getServerSession(authOptions);
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