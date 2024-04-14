"use client";

import React, { useState, useEffect } from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Link from "next/link"
import Image from 'next/image';
import nomoon from '../../../../public/numone.svg'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';



const CardPost = () => {
    const [totalReqPosts, setTotalReqPosts] = useState(0);
    const [totalDonPosts, setTotalDonPosts] = useState(0);
    const [percentageIncrease, setPercentageIncrease] = useState(0);

    useEffect(() => {
        const fetchTotalReqPosts = async () => {
            try {
                const response = await fetch("/api/admin/posts/reqPost");
                if (response.ok) {
                    const data = await response.json();
                    setTotalReqPosts(data.length);
                } else {
                    console.error("Failed to fetch total number of requested posts");
                }
            } catch (error) {
                console.error("Error fetching total number of requested posts:", error);
            }
        };

        fetchTotalReqPosts();
    }, []);

    useEffect(() => {
        const fetchTotalDonPosts = async () => {
            try {
                const response = await fetch("/api/admin/posts/donPost");
                if (response.ok) {
                    const data = await response.json();
                    setTotalDonPosts(data.length);
                } else {
                    console.error("Failed to fetch total number of donated posts");
                }
            } catch (error) {
                console.error("Error fetching total number of donated posts:", error);
            }
        };

        fetchTotalDonPosts();
    }, []);

    useEffect(() => {
        const calculatePercentageIncrease = () => {
            const percentageIncreaseValue =
                ((totalDonPosts - totalReqPosts) / (totalReqPosts + totalDonPosts)) * 100;
            setPercentageIncrease(percentageIncreaseValue);
        };

        calculatePercentageIncrease();
    }, [totalReqPosts, totalDonPosts]);

    return (
        // <div className="bg-gray-300 p-[20px] rounded-lg flex gap-[20px] cursor-pointer w-full hover:bg-[--lightishBlue]">
        //     <Link href="/admin/dashboard/posts">
        //         <div className="flex gap-[20px]">
        //             <PostAddIcon sx={{ fontSize: 24 }} />
        //             <div className="flex flex-col gap-[20px]">
        //                 <span className=''>Total Postes</span>
        //                 <span className='text-2xl font-semibold'>{totalDonPosts + totalReqPosts}</span>
        //                 <span className='text-base font-light'>
        //                     <span className='font-bold text-green-600'>{percentageIncrease.toFixed(2).split('.')[1]}%</span> plus que la semaine précédente
        //                 </span>
        //             </div>
        //         </div>
        //     </Link>
        // </div>
        <Link href="/admin/dashboard/posts">
    <div className=" px-2 py-8  md:flex justify-between  items-center  group-hover:blur-sm hover:!blur-none">
        <div className=" rounded-full   overflow-hidden  ">
            <Image src={nomoon} alt="Mountain" height={80} width={80} className=" "/>
        </div>
        <div className='flex flex-col text-center md:text-start'>
            <h3 className='text-[#ACACAC] text-xs'>
            Total Postes
            </h3>
        <h2 className='text-[--textColor] text-xl font-bold'>
        {totalDonPosts + totalReqPosts}
        </h2>
        <p className='text-[#292D32] text-sm '>
            <span className='text-[#EF507F] text-sm'>
            <ArrowUpwardIcon/>{percentageIncrease.toFixed(2).split('.')[1]}%
            </span>
            plus que la semaine précédente 
        </p>
        </div>
    </div>
    </Link>
    );
};

export default CardPost;
