"use client";

import React, { useState, useEffect } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

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
        <div className="bg-gray-300 p-[20px] rounded-lg flex gap-[20px] cursor-pointer w-full hover:bg-blue-300">
            <PeopleAltIcon sx={{ fontSize: 24 }} />
            <div className="flex flex-col gap-[20px]">
                <span className=''>Total Posts</span>
                <span className='text-2xl font-semibold'>{totalDonPosts + totalReqPosts}</span>
                <span className='text-base font-light'>
                    <span className='font-bold text-green-600'>{percentageIncrease}%</span> more than previous week
                </span>
            </div>
        </div>
    );
};

export default CardPost;
