import React from 'react'

const getData = async (id) => {
    const res = await fetch('https://www.hibaaatae.com/api/posts/donatePosts', {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed");
    }
  
    return res.json();
  };
  

const UserDetails = async ({ params }) => {

    const { id } = params;

    const data = await getData(id);

  return (
    <div>UserDetails</div>
  )
}

export default UserDetails