import DashboardNavbar from '@/components/Admin/DashboardNavbar';
import Sidebar from '../../../components/Admin/Sidebar';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import LostPage from '@/components/LostPage';
import Image from 'next/image';
// import '../../globals.css'

const Layout = async ({ children }) => {
  // If user is not logged in or is not an admin, render only the LostPage
  const session = await getServerSession(authOptions);
    
    if (session === 'loading') {
      return (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
          <Image src={loader} height={50} width={45} alt="" />
        </div>
      );
    }
    
    // Ensure session is defined before accessing its properties
    if (!session || session.user.role !== 'ADMIN') {
      return (
        <>
          <div>
            <LostPage/>
          </div>
        </>
      );
    }

  // Render the layout only if the user is logged in and is an admin
  return (
    <div className="flex bg-[#F4F4F4]">
      <div className="bg-white bg-bgSoft min-h-screen p-[20px]">
        <Sidebar />
      </div>
      <div className="content flex-1 p-[20px]">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
