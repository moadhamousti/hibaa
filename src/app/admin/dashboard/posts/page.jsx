// "use client"
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminPostsPage = () => {
//     const [posts, setPosts] = useState([]);
//     const [editingPost, setEditingPost] = useState(null);
//     const [editedPostData, setEditedPostData] = useState({});

//     useEffect(() => {
//         fetchPosts();
//     }, []);

//     const fetchPosts = async () => {
//         try {
//             const response = await axios.get('/api/admin/posts');
//             setPosts(response.data);
//         } catch (error) {
//             console.error('Error fetching posts:', error);
//         }
//     };

//     const handleEdit = (post) => {
//         setEditingPost(post);
//         setEditedPostData({ ...post });
//     };

//     const handleSaveEdit = async () => {
//         try {
//             await axios.put(`/api/admin/posts/${editingPost.id}`, editedPostData);
//             setEditingPost(null);
//             fetchPosts(); // Refresh posts after edit
//         } catch (error) {
//             console.error('Error editing post:', error);
//         }
//     };

//     const handleDelete = async (postId) => {
//         try {
//             await axios.delete(`/api/admin/posts/${postId}`);
//             fetchPosts(); // Refresh posts after delete
//         } catch (error) {
//             console.error('Error deleting post:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Admin Posts</h1>
//             <ul>
//                 {posts.map(post => (
//                     <li key={post.id}>
//                         {editingPost && editingPost.id === post.id ? (
//                             <>
//                                 <input
//                                     type="text"
//                                     value={editedPostData.title}
//                                     onChange={(e) => setEditedPostData({ ...editedPostData, title: e.target.value })}
//                                 />
//                                 {/* Add inputs for other fields */}
//                                 <button onClick={handleSaveEdit}>Save</button>
//                             </>
//                         ) : (
//                             <>
//                                 <div>{post.title}</div>
//                                 {/* Display other fields */}
//                                 <button onClick={() => handleEdit(post)}>Edit</button>
//                                 <button onClick={() => handleDelete(post.id)}>Delete</button>
//                             </>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AdminPostsPage;










import React from 'react'

const Posts = () => {
  return (
    <div>Posts</div>
  )
}

export default Posts