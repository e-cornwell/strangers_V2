import React from 'react';

const DeletePost = async (postIdToDelete, token, posts, setPosts) => {
    //console.log(token)

    const response = await fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${postIdToDelete}`, 
    {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const json = await response.json();
    if(json){
        const newPosts = posts.filter(post => post.id !== postIdToDelete);
        setPosts(newPosts);
    }
};

export default DeletePost;