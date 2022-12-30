import React, { useState } from 'react';
import EditPost from './EditPost';
import CreatePost from './CreatePost';
import DeletePost from './DeletePost';

const Posts = (props) => {
    const [postId, setPostId] = useState(null);
    const setPosts = props.setPosts;
    const posts = props.posts;
    const token = props.token;

    return (
        <div>
            <h1>Posts</h1>
            {
                postId 
                    ? <EditPost posts={posts} setPosts={setPosts} postId={postId} setPostId={setPostId} token={token}/>
                    : <CreatePost posts={posts} setPosts={setPosts} token={token}/>
            }

            {posts.map((post)=> {
                
                return (
                    <div 
                        key={post._id} 
                        className={post.isAuthor ? "singlePost myPost" : 'singlePost'}
                    >
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <p>Price: {post.price}</p>
                        <p>Location: {post.location}</p>
                        <p>Will Deliver: {post.willDeliver}</p>
                        { post.isAuthor ? <button onClick={()=> {EditPost, setPostId(post._id)}}>Edit</button> : null }
                        { post.isAuthor ? <button onClick={()=> {DeletePost(post._id, token, posts, setPosts)}}>Delete</button> : null }
                    </div>
                );
            })}
        </div>
    )
};

export default Posts;