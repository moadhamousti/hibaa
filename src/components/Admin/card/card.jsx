"use client"

import React, { useState, useEffect } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Link from "next/link"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Image from 'next/image';
import nomoon from '../../../../public/numtwo.svg'
 


const Card = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [percentageIncrease, setPercentageIncrease] = useState(0);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const response = await fetch('/api/admin/users');
                if (response.ok) {
                    const data = await response.json();
                    const totalUsersCount = data.length;
                    setTotalUsers(totalUsersCount);
                    calculatePercentageIncrease(data);
                } else {
                    console.error('Failed to fetch total number of users');
                }
            } catch (error) {
                console.error('Error fetching total number of users:', error);
            }
        };

        fetchTotalUsers();
    }, []);

    // Function to calculate percentage increase
    const calculatePercentageIncrease = (users) => {
        // Get the current date
        const currentDate = new Date();
        // Calculate the date one week ago
        const oneWeekAgoDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));

        // Filter users created in the current week and the previous week
        const usersCurrentWeek = users.filter(user => new Date(user.createdAt) >= oneWeekAgoDate);
        const usersPreviousWeek = users.filter(user => new Date(user.createdAt) < oneWeekAgoDate);

        // Get the counts of users for both weeks
        const countCurrentWeek = usersCurrentWeek.length;
        const countPreviousWeek = usersPreviousWeek.length;

        // Calculate the percentage increase
        const percentageIncreaseValue = calculatePercentage(countPreviousWeek, countCurrentWeek);
        setPercentageIncrease(percentageIncreaseValue);
    };

    // Function to calculate percentage increase
    const calculatePercentage = (previousWeekCount, currentWeekCount) => {
        if (previousWeekCount === 0) {
            // If there were no users in the previous week, any users in the current week will be a 100% increase
            return 100;
        }
        // Calculate the percentage increase
        return ((currentWeekCount - previousWeekCount) / previousWeekCount) * 100;
    };

    return (
        // <div className="bg-gray-300 p-[20px] rounded-lg flex gap-[20px] cursor-pointer w-full hover:bg-[--lightishBlue]">
        //     <Link href="/admin/dashboard/users">
        //         <div className="flex gap-[20px]">
        //             <PeopleAltIcon sx={{ fontSize: 24 }} />
        //             <div className="flex flex-col gap-[20px]">
        //                 <span className=''>Total Utilisateurs</span>
        //                 <span className='text-2xl font-semibold'>{totalUsers}</span>
        //                 <span className='text-base font-light'>
        //                     <span className='font-bold text-green-600'>{percentageIncrease}%</span> plus que la semaine précédente
        //                 </span>
        //             </div>
        //         </div>
        //     </Link>   
        // </div>
<Link href="/admin/dashboard/users">
    <div className=" px-2 py-8  md:flex justify-between  items-center gap-3 ">
        <div className=" rounded-full   overflow-hidden  ">
            <Image src={nomoon} alt="Mountain" height={80} width={80} className=" "/>
        </div>
        <div className='flex flex-col text-center md:text-start'>
            <h3 className='text-[#ACACAC] text-xs'>
                Total Utilisateurs
            </h3>
            <h2 className='text-[--textColor] text-xl font-bold'>
                {totalUsers}
            </h2>
            <p className='text-[#292D32] text-sm '>
                <span className='text-[#EF507F] text-sm'>
                <ArrowUpwardIcon/>{percentageIncrease.toFixed(2).split('.')[1]}% 
                </span>
                <span className='ml-2'>plus que la semaine précédente </span>
            </p>
        </div>
    </div>
    </Link>
    );
};

export default Card;
