// middleware.js

import { getSession } from 'next-auth/react';

const requireAuthentication = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export { requireAuthentication };
