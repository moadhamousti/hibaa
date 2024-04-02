// "use client"
// import axios from "axios";
// import { useState } from "react";

// const MailingList = () => {
//   const [mail, setMail] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const subscribe = () => {
//     setLoading(true);
//     axios
//       .put("api/mailingList", {
//         mail,
//       })
//       .then((result) => {
//         if (result.status === 200) {
//           console.log(result.data.message);
//           setLoading(false);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   };
//   return (
//     <div className='my-10'>
//       <hr className='my-5' />
//       <h2 className='text-3xl md:text-3xl font-semibold font-title'>
//         Stay Tuned!
//       </h2>
//       <label className='label'>
//         <p className='text-lg max-w-xl text-center m-auto leading-9'>
//           Want to be the first to know when SupaNexTail launches and get an
//           exclusive discount? Sign up for the newsletter!
//         </p>
//       </label>
//       <div className='mt-5'>
//         <input
//           onChange={(e) => {
//             setMail(e.target.value);
//           }}
//           type='email'
//           placeholder='Your email'
//           className='input input-primary input-bordered'></input>
//         <button
//           onClick={subscribe}
//           className={`btn ml-3 bg-black text-white ${
//             loading ? "btn-disabled loading" : "btn-primary"
//           }`}>
//           I'm in!
//         </button>
//       </div>
//       <hr className='my-5' />
//     </div>
//   );
// };

// export default MailingList;





"use client";
import { useState } from 'react';
import Groups2SharpIcon from '@mui/icons-material/Groups2Sharp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';



const Menus =[
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />,
      },
      {
        title: "Users",
        path: "/admin/dashboard/users",
        icon: <GroupIcon />,
      },
      {
        title: "Posts",
        path: "/admin/dashboard/posts",
        icon: <PostAddSharpIcon />,
      },
      {
        title: "Categories",
        path: "/admin/dashboard/categories",
        icon: <CategorySharpIcon />,
      },
    ],
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`   p-2 duration-300 ${open ? "w-72" : "w-14"} relative`}>

      <Groups2SharpIcon className={`text-4xl rounded-full text-[--textColor]  absolute -right-4 top-6  cursor-pointer ${!open && 'rotate-180' } `} onClick={() => setOpen(!open)} />

    <div className='inline-flex items-center relative mb-4 jutify-between '>
    <img src='/tiktok.png' className={`rounded-full  cursor-pointer block float-left duration-500    ${open ? 'w-1/3': "w-1/4  absolute top-4 mb-4  -left-1" } ${!open && 'rotate-[360deg]'}`}/>
    <h1 className={`text-[--softBg] text-italic origin-left font-bold text-2xl duration-300 ${!open && 'scale-0'}`}>Hiba&Ataa </h1>

    </div>

    <ul href={Menus.path}>
        <li className={`text-[--softBg] text-sm flex items-center gap-x-2  cursor-pointer 
          hover:border hover:border-[--softBg] p-2 rounded-xl mt-1 ${!open && 'hidden'} ${!open && 'hover:block'}`}>
          <span className='text-2xl block float-left'>
            {Menus.icon || <CategorySharpIcon />}
          </span>
          <span className='text-base font-medium flex-1 duration-200'>
            {Menus.title}
          </span>
        </li>
    </ul>



    </div>
  );
};

export default Sidebar;