import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // Fetch all posts from the database
        const allPosts = await db.Post.findMany();

        // Create an object to store the count of each category
        const categoryCounts = {};

        // Iterate over each post and count the occurrences of each category
        allPosts.forEach(post => {
            const category = post.category;
            if (categoryCounts[category]) {
                categoryCounts[category]++;
            } else {
                categoryCounts[category] = 1;
            }
        });

        // Convert the categoryCounts object to an array of objects with 'name' and 'count' properties
        const mostUsedCategories = Object.keys(categoryCounts).map(category => ({
            name: category,
            count: categoryCounts[category]
        }));

        // Sort the mostUsedCategories array based on the count in descending order
        mostUsedCategories.sort((a, b) => b.count - a.count);

        // Log the most used categories
        console.log('Most used categories:', mostUsedCategories);

        return new NextResponse(JSON.stringify(mostUsedCategories), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
};

