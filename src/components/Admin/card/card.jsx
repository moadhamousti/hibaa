"use client"

import React, { useState, useEffect } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

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
        <div className="bg-gray-300 p-[20px] rounded-lg flex gap-[20px] cursor-pointer w-full hover:bg-blue-300">
            <PeopleAltIcon sx={{ fontSize: 24 }} />
            <div className="flex flex-col gap-[20px]">
                <span className=''>Total Utilisateurs</span>
                <span className='text-2xl font-semibold'>{totalUsers}</span>
                <span className='text-base font-light'>
                    <span className='font-bold text-green-600'>{percentageIncrease}%</span> plus que la semaine précédente
                </span>
            </div>
        </div>
    );
};

export default Card;
