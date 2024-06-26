"use client"

// pages/components/Admin/card/cardCategory.jsx

import React, { useState, useEffect } from 'react';
import CategoryIcon from '@mui/icons-material/Category';
import Link from "next/link"
import Image from 'next/image';
import nomoon from '../../../../public/numthree.svg'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const CardCategory = () => {
    const [totalCategories, setTotalCategories] = useState(0);
    const [percentageIncrease, setPercentageIncrease] = useState(0);

    useEffect(() => {
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

        const calculatePercentage = (previousWeekCount, currentWeekCount) => {
            if (previousWeekCount === 0) {
                // If there were no categories in the previous week, any categories in the current week will be a 100% increase
                return 100;
            }
            // Calculate the percentage increase
            return ((currentWeekCount - previousWeekCount) / previousWeekCount) * 100;
        };

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
    }, []); // Empty dependency array, as this effect should run only once

    return (
        <Link href="/admin/dashboard/categories">
            <div className=" px-2 py-8  md:flex justify-between  items-center gap-3">
                <div className=" rounded-full   overflow-hidden  ">
                    <Image src={nomoon} alt="Mountain" height={80} width={80} className=" "/>
                </div>
                <div className='flex flex-col text-center md:text-start'>
                    <h3 className='text-[#ACACAC] text-xs'>
                        Total Catégories
                    </h3>
                    <h2 className='text-[--textColor] text-xl font-bold'>
                        {totalCategories}
                    </h2>
                    <p className='text-[#292D32] text-sm '>
                        <span className='text-[#EF507F] text-sm'>
                            <ArrowUpwardIcon/>{percentageIncrease}%
                        </span>
                        <span className='ml-2'>plus que la semaine précédente </span> 
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default CardCategory;
