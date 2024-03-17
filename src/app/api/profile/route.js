import { getSession } from "next-auth/react"; // Import getSession to access session data
import { db } from "../../../lib/db";

export const GET = async (request) => {
  try {
    const session = await getSession({ req: request });
    if (!session) {
      return { error: "Unauthorized", status: 401 };
    }

    // Fetch user profile data from the database
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, username: true, email: true },
    });

    if (!user) {
      return { error: "User not found", status: 404 };
    }

    return { user };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { error: "Internal Server Error", status: 500 };
  }
};



