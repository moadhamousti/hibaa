import NextAuth from "next-auth";

export const authOptions = {
  // ... other NextAuth configuration
  session: {
    // Access user information
    user(session, user) {
      return {
        id: session.user.id,
        username: session.user.username,
        name:session.user.name,
        email:session.user.email,
        image:session.user.image,
        role:session.user.role,
        password:session.user.password,



        // role: user.UserRole,
         
        // ... other user properties you need
      };
    },
  },
};