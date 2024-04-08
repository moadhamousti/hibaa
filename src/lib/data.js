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
        const count = await db.user.count({
            where: {
                OR: [
                  { email: { contains: q } },
                  { username: { contains: q } },
                  { name: { contains: q } }
                ]
            },
        });
        console.log(count);

        return {users,count};
    } catch (err) {
        throw new Error("Failed to fetch users");
    }
};









export const fetchUsersByPosts = async (q, page) => {
    const ITEM_PER_PAGE = 6;
    const skip = ITEM_PER_PAGE * (page - 1);

    try {
        // Fetch users with the specified query
        const users = await db.user.findMany({
            where: {
                OR: [
                    { email: { contains: q } },
                    { username: { contains: q } },
                    { name: { contains: q } }
                ]
            },
            include: {
                DonPosts: true,
                ReqPost: true,
            },
            take: ITEM_PER_PAGE,
            skip: skip,
        });

        // Calculate total post count for each user
        const usersWithCount = await Promise.all(users.map(async user => {
            const donPostCount = user.DonPosts.length; // Count donation posts
            const reqPostCount = user.ReqPost.length; // Count request posts
            const totalPostCount = donPostCount + reqPostCount;
            return { ...user, totalPostCount };
        }));

        // Sort users by total post count in descending order
        const sortedUsers = usersWithCount.sort((a, b) => b.totalPostCount - a.totalPostCount);

        return { users: sortedUsers, count: sortedUsers.length };
    } catch (err) {
        throw new Error("Failed to fetch users");
    }
};














export const fetchPosts = async (q, page) => {
    const ITEM_PER_PAGE = 3;
    const skip = ITEM_PER_PAGE * (page - 1);

    try {
        const donPostsPromise = db.DonPost.findMany({
            where: {
                OR: [
                    { title: { contains: q } },
                    { desc: { contains: q } },
                    { location: { contains: q } },
                    { category: { contains: q } }
                ]
            },
            take: ITEM_PER_PAGE,
            skip: skip,
        });

        const reqPostsPromise = db.ReqPost.findMany({
            where: {
                OR: [
                    { title: { contains: q } },
                    { desc: { contains: q } },
                    { location: { contains: q } },
                    { category: { contains: q } }
                ]
            },
            take: ITEM_PER_PAGE,
            skip: skip,
        });

        const [donPosts, reqPosts] = await Promise.all([donPostsPromise, reqPostsPromise]);

        const posts = [...donPosts, ...reqPosts];

        const countDon = await db.DonPost.count({
            where: {
                OR: [
                    { title: { contains: q } },
                    { desc: { contains: q } },
                    { location: { contains: q } },
                    { category: { contains: q } }
                ]
            },
        });

        const countReq = await db.ReqPost.count({
            where: {
                OR: [
                    { title: { contains: q } },
                    { desc: { contains: q } },
                    { location: { contains: q } },
                    { category: { contains: q } }
                ]
            },
        });

        // Sum the counts to get the total count
        const count = countDon + countReq;

        console.log(count)

        return { posts, count };
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch posts");
    }
};






export const fetchUser = async (id) => {
    console.log(id)
    try {
        const user = await db.user.findUnique({
            where: { id }
        });

        console.log(user) 
        return user;
    } catch (err) {
        throw new Error("Failed to fetch user");
    }
};

export const fetchCategory = async (id) => {
    console.log(id)
    try {
        const category = await db.MedCategory.findUnique({
            where: { id }
        });

        console.log(category) 
        return category;
    } catch (err) {
        throw new Error("Failed to fetch user");
    }
};

export const fetchLocation = async (id) => {
    console.log(id)
    try {
        const location = await db.LocationCategory.findUnique({
            where: { id }
        });

        console.log(location) 
        return location;
    } catch (err) {
        throw new Error("Failed to fetch user");
    }
};






export const fetchPost = async (id) => {
    console.log(id)
    try {
        const reqPost = await db.ReqPost.findUnique({
            where: { id }
        });
        const donPost = await db.DonPost.findUnique({
            where: { id }
        });

        // Check if either reqPost or donPost is not null
        if (reqPost) {
            return reqPost;
        } else if (donPost) {
            return donPost;
        } else {
            throw new Error("Post not found"); // Throw an error if both are null
        }
    } catch (err) {
        throw new Error("Failed to fetch post: " + err.message); // Include the error message from the caught error
    }
};




export const fetchForm = async (id) => {
    console.log(id)
    try {
        const DonatorForm = await db.DonatorForm.findUnique({
            where: { id }
        });
        // Check if either reqPost or donPost is not null
        if (DonatorForm) {
            return DonatorForm;
        } else {
            throw new Error("Form not found"); // Throw an error if both are null
        }
    } catch (err) {
        throw new Error("Failed to fetch post: " + err.message); // Include the error message from the caught error
    }
};






export const fetchcategories = async (q, page) => {
    const ITEM_PER_PAGE = 5;
    const skip = ITEM_PER_PAGE * (page - 1);

    try {
        const categories = await db.MedCategory.findMany({
            where: {
                OR: [{ title: { contains: q } }],
            },
            include: {
                DonPosts: true,
                ReqPost: true,
            },
            take: ITEM_PER_PAGE,
            skip: skip,
        });
        const count = await db.MedCategory.count({
            where: {
                OR: [
                  { title: { contains: q } },
                ]
            },
        });

        console.log(count)
        return { categories, count };
    } catch (err) {
        throw new Error("Failed to fetch categories");
    }
};

export const fetchlocations = async (q, page) => {
    const ITEM_PER_PAGE = 6;
    const skip = ITEM_PER_PAGE * (page - 1);

    try {
        const locations = await db.LocationCategory.findMany({
            where: {
                OR: [{ title: { contains: q } }],
            },
            include: {
                DonPosts: true,
                ReqPost: true,
            },
            take: ITEM_PER_PAGE,
            skip: skip,
        });
        const count = await db.MedCategory.count({
            where: {
                OR: [
                  { title: { contains: q } },
                ]
            },
        });
        return { locations, count };
    } catch (err) {
        throw new Error("Failed to fetch categories");
    }
};








export const fetchForms = async (q, page) => {
    const ITEM_PER_PAGE = 5;
    const skip = ITEM_PER_PAGE * (page - 1);

    try {
        const forms = await db.DonatorForm.findMany({
            where: {
                OR: [
                    { phaName: { contains: q } },
                    { desc: { contains: q } },
                    { ownerName: { contains: q } },
                    { location: { contains: q } }
                ]
            },
            take: ITEM_PER_PAGE,
            skip: skip,
        });
        
        // Ensure forms is an array
        if (!Array.isArray(forms)) {
            throw new Error("Forms data is not an array");
        }
        
        const count = await db.DonatorForm.count({
            where: {
                OR: [
                    { phaName: { contains: q } },
                    { desc: { contains: q } },
                    { ownerName: { contains: q } },
                    { location: { contains: q } }
                ]
            },
        });
        
        return { forms, count };
        
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch form");
    }
};