import { getSession } from 'next-auth/react';
import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const userId = session.user.id;

  try {
    // Find the donation post by id and its user
    const post = await db.DonPost.findFirst({
      where: { id: req.query.id, userId: userId },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Delete the donation post
    await db.DonPost.delete({ where: { id: req.query.id } });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
