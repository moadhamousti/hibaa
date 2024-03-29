"use client"

import React, { useState, useEffect } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const CardPost = () => {
    const [totalPosts, setTotalPosts] = useState(0);
    const [percentageIncrease, setPercentageIncrease] = useState(0);

    useEffect(() => {
        const fetchTotalPosts = async () => {
            try {
                const response = await fetch('/api/admin/posts');
                if (response.ok) {
                    const data = await response.json();
                    const totalPostsCount = data.length;
                    setTotalPosts(totalPostsCount);
                    calculatePercentageIncrease(data);
                } else {
                    console.error('Failed to fetch total number of posts');
                }
            } catch (error) {
                console.error('Error fetching total number of posts:', error);
            }
        };

        fetchTotalPosts();
    }, []);

    // Function to calculate percentage increase
    const calculatePercentageIncrease = (posts) => {
        // Get the current date
        const currentDate = new Date();
        // Calculate the date one week ago
        const oneWeekAgoDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));

        // Filter posts created in the current week and the previous week
        const postsCurrentWeek = posts.filter(post => new Date(post.createdAt) >= oneWeekAgoDate);
        const postsPreviousWeek = posts.filter(post => new Date(post.createdAt) < oneWeekAgoDate);

        // Get the counts of posts for both weeks
        const countCurrentWeek = postsCurrentWeek.length;
        const countPreviousWeek = postsPreviousWeek.length;

        // Calculate the percentage increase
        const percentageIncreaseValue = calculatePercentage(countPreviousWeek, countCurrentWeek);
        setPercentageIncrease(percentageIncreaseValue);
    };

    // Function to calculate percentage increase
    const calculatePercentage = (previousWeekCount, currentWeekCount) => {
        if (previousWeekCount === 0) {
            // If there were no posts in the previous week, any posts in the current week will be a 100% increase
            return 100;
        }
        // Calculate the percentage increase
        return ((currentWeekCount - previousWeekCount) / previousWeekCount) * 100;
    };

    return (
        <div className="bg-gray-300 p-[20px] rounded-lg flex gap-[20px] cursor-pointer w-full hover:bg-blue-300">
            <PeopleAltIcon sx={{ fontSize: 24 }} />
            <div className="flex flex-col gap-[20px]">
                <span className=''>Total Posts</span>
                <span className='text-2xl font-semibold'>{totalPosts}</span>
                <span className='text-base font-light'>
                    <span className='font-bold text-green-600'>{percentageIncrease}%</span> more than previous week
                </span>
            </div>
        </div>
    );
};

export default CardPost;
