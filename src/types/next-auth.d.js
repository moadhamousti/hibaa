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
        email:session.email,
        image:session.image,
        role:session.role,


        // role: user.UserRole,
         
        // ... other user properties you need
      };
    },
  },
};