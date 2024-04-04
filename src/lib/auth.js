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
          return null;
        }

        try {
          const existingUser = await db.user.findUnique({
            where: { email: credentials?.email },
          });
          if (!existingUser) {
            return null; // User not found
          }
          
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
            role:existingUser.role,
            name:existingUser.name,
            image:existingUser.image,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      console.log("JWT callback", token, user, session);
  
      // Update token with session data if available
      if (trigger === "update"  && session?.name) {
          token.name = session.name || token.name;
          token.username = session.username || token.username;
          token.email = session.email || token.email;
          token.image = session.image || token.image;
          token.password = session.password || token.password;
          token.role = session.role || token.role;
      }
  
      // If a user is present, update token with user data
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          name: user.name,
          password: user.password,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      }
  
      if (trigger === "/api/user" && token.email) {
        const updatedUser = await db.user.update({
          where: { email: token.email },
          data: {
            name: token.name,
            username: token.username,
            password: token.password,
            email: token.email,
            image: token.image,
            role: token.role,
          },
        });
        console.log("Updated user in database:", updatedUser);
      }
    
      return token;
    },
  
    async session({ session, user, token }) {
      console.log("Session callback", session, user, token);
  
      // Pass session data to session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          name: token.name,
          password: token.password,
          email: token.email,
          image: token.image,
          role: token.role,
        },
      };
    },
  }
};  









// callbacks: {
//   async jwt({ token,user, session,trigger}){
//       console.log("JWT callback" ,token, user, session);
//       if (trigger === "update") {
//         if (session?.name) {
//             token.name = session.name;
//         }
//         if (session?.username) {
//             token.username = session.username;
//         }
//         if (session?.email) {
//           token.email = session.email;
//         }
//         if (session?.image) {
//           token.image = session.image;
//         }
//         if (session?.password) {
//           token.password = session.password;
//         }
//         if (session?.role) {
//           token.role = session.role;
//         }
//     }

//     //pass in to token
//       if(user) {
//           return {
//               ...token,
//               id:user.id,
//               username:user.username,
//               name:user.name,
//               password:user.password,
//               image:user.image,
//               role: user.role, 
//               email: user.email,           
//           }
//       }

//       // update user in database 
//       const newUser = await db.user.update({
//         where: {
//           email: token.email,
//         },
//         data:{
//           name:token.name,
//           username:token.username,
//           password:token.password,
//           email:token.email,
//           image:token.image,
//           role:token.role,
//         },
//       })
//       console.log(newUser);

//       return token
//   },
//   async session({session, user,token } ){
//       console.log("session callback" ,session, user, token);
//       //pass to session
//       return{
//           ...session,
//           user:{
//               ...session.user,
//               id:token.id,
//               username: token.username,
//               name: token.name,
//               password: token.password,
//               email: token.email,
//               image:token.image,
//               role: token.role,

//           }
//       }
//   },
// }
// };
