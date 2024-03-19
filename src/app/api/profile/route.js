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







import { getSession } from 'next-auth/react';
import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { name, username, email } = req.body;

  try {
    // Update user profile information in the database
    await db.User.update({
      where: { email: session.user.email },
      data: {
        name,
        username,
        email,
        // You can update other fields like password here if needed
      },
    });

    return res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}



