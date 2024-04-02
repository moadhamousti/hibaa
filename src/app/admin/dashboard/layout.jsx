import DashboardNavbar from '@/components/Admin/DashboardNavbar';
import Sidebar from '../../../components/Admin/Sidebar';
// import '../../globals.css'

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="bg-blue-600 bg-bgSoft min-h-screen p-[20px]">
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
