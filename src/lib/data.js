import { db } from "./db";
// import { NextResponse } from "next/server";

// export const GET = async () => {
//     try {
//         const users = await db.user.findMany({
//             include: {
//                 DonPosts: true,
//             },
//         });

//         // Calculate the total number of users
//         const userCount = users.length;

//         // Calculate the post count for each user
//         const usersWithPostCount = users.map(user => {
//             return {
//                 ...user,
//                 postCount: user.DonPosts.length,
//                 userCount: userCount, // Include the total user count for each user object
//             };
//         });

//         return new NextResponse(JSON.stringify(usersWithPostCount), { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
//     }
// };


export const fetchUsers = async (q, page) => {
    const ITEM_PER_PAGE = 3;
    const skip = ITEM_PER_PAGE * (page - 1);

    try {
        const users = await db.user.findMany({
            where: {
                OR: [
                  { email: { contains: q } },
                  { username: { contains: q } },
                  { name: { contains: q } }
                ]
            },
            take: ITEM_PER_PAGE, // use 'take' instead of 'limit'
            skip: skip,
        });
        const count = await db.user.findMany({
            where: {
                OR: [
                  { email: { contains: q } },
                  { username: { contains: q } },
                  { name: { contains: q } }
                ]
            },
        });
        return {users,count};
    } catch (err) {
        throw new Error("Failed to fetch users");
    }
};








export const fetchPosts = async (q, page) => {
    const ITEM_PER_PAGE = 3;
    const skip = ITEM_PER_PAGE * (page - 1);

    console.log(q)

    try {
        const DonPost = await db.DonPost.findMany({
            where: {
                OR: [
                  { title: { contains: q } },
                  { desc: { contains: q } },
                  { location: { contains: q } },
                  { category: { contains: q } }
                ]
            },
            take: ITEM_PER_PAGE, // use 'take' instead of 'limit'
            skip: skip,
        });
        const count = await db.DonPost.findMany({
            where: {
                OR: [
                  { title: { contains: q } },
                  { desc: { contains: q } },
                  { location: { contains: q } },
                  { category: { contains: q } }
                ]
            },
        });
        return {DonPost,count};
    } catch (err) {
        throw new Error("Failed to fetch users");
    }
};




