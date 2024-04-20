import { withAuth } from 'next-auth/middleware';

export default withAuth({
  // Your custom configuration here
  matcher: ['/pharmaForm']
});