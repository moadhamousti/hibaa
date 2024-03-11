import NextAuth from "next-auth";

export const authOptions = {
  // ... other NextAuth configuration
  session: {
    // Access user information
    user(session, user) {
      return {
        id: session.user.id,
        username: session.user.username, // Access username from session.user
        // ... other user properties you need
      };
    },
  },
};