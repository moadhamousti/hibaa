"use client"

import React, { useState, useEffect } from 'react';
import CategoryIcon from '@mui/icons-material/Category';
import Link from "next/link"


const CardCategory = () => {
    const [totalCategories, setTotalCategories] = useState(0);
    const [percentageIncrease, setPercentageIncrease] = useState(0);

    useEffect(() => {
        const fetchTotalCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (response.ok) {
                    const data = await response.json();
                    const totalCategoriesCount = data.length;
                    setTotalCategories(totalCategoriesCount);
                    calculatePercentageIncrease(data);
                } else {
                    console.error('Failed to fetch total number of categories');
                }
            } catch (error) {
                console.error('Error fetching total number of categories:', error);
            }
        };

        fetchTotalCategories();
    }, []);

    // Function to calculate percentage increase
    const calculatePercentageIncrease = (categories) => {
        // Get the current date
        const currentDate = new Date();
        // Calculate the date one week ago
        const oneWeekAgoDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));

        // Filter categories created in the current week and the previous week
        const categoriesCurrentWeek = categories.filter(category => new Date(category.createdAt) >= oneWeekAgoDate);
        const categoriesPreviousWeek = categories.filter(category => new Date(category.createdAt) < oneWeekAgoDate);

        // Get the counts of categories for both weeks
        const countCurrentWeek = categoriesCurrentWeek.length;
        const countPreviousWeek = categoriesPreviousWeek.length;

        // Calculate the percentage increase
        const percentageIncreaseValue = calculatePercentage(countPreviousWeek, countCurrentWeek);
        setPercentageIncrease(percentageIncreaseValue);
    };

    // Function to calculate percentage increase
    const calculatePercentage = (previousWeekCount, currentWeekCount) => {
        if (previousWeekCount === 0) {
            // If there were no categories in the previous week, any categories in the current week will be a 100% increase
            return 100;
        }
        // Calculate the percentage increase
        return ((currentWeekCount - previousWeekCount) / previousWeekCount) * 100;
    };

    return (
        <div className="bg-gray-300 p-[20px] rounded-lg flex gap-[20px] cursor-pointer w-full hover:bg-[--lightishBlue]">
            <Link href="/admin/dashboard/categories">
                <div className="flex gap-[20px]">
                    <CategoryIcon sx={{ fontSize: 24 }} />
                    <div className="flex flex-col gap-[20px]">
                        <span className=''>Total Catégories</span>
                        <span className='text-2xl font-semibold'>{totalCategories}</span>
                        <span className='text-base font-light'>
                            <span className='font-bold text-green-600'>{percentageIncrease}%</span> plus que la semaine précédente
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardCategory;

