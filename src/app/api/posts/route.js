import { getSession } from 'next-auth/react';
import { db } from '@/lib/db';

export default async function handler(req, res) {
  console.log('Request method:', req.method); // Log the request method

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const session = await getSession({ req });
  console.log('Session:', session); // Log the session

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const userId = session.user.id;

  try {
    const userWithPosts = await db.User.findUnique({
      where: { id: userId },
      include: {
        DonPosts: true // Assuming DonPosts is the relation to the posts
      }
    });

    if (!userWithPosts) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(userWithPosts.DonPosts || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
