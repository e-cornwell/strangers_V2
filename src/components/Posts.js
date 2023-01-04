import React, {useState} from 'react';
import EditPost from './EditPost';
import DeletePost from './DeletePost';

const Posts = (props) => {
    const [postId, setPostId] = useState('')
    const [message, setMessage] = useState('');
    const [sendMessage, setSendMessage] = useState(false)

    const userId = props.userId;
    const setPosts = props.setPosts;
    const posts = props.posts;
    const token = props.token;
    const fetchPosts = props.fetchPosts;
    
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        await fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${postId}/messages`, {
            method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: {
                    content: message
                }
            })
        }).then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(console.error);
    }

    const handleClick = (id) => {
        setSendMessage(!sendMessage);
        setPostId(id)
    }    

    return (
        <div key={postId}>
            
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
                        { post.isAuthor && userId ? <button onClick={()=>{EditPost, console.log('edit')}}>Edit</button> : <button onClick={ev => handleClick(post._id)}>Send Message</button>}
                        {
                            sendMessage && userId && post._id === postId ?
                            <form>
                                <input key={post._id} placeholder='message' value={message} onChange={(ev) => setMessage(ev.target.value)}></input>
                                <button onClick={ev => handleSubmit(ev)}>Send</button>
                            </form> : null
                        }                            
                        { post.isAuthor && userId ? <button onClick={()=> {DeletePost(post._id, token, posts, setPosts, fetchPosts)}}>Delete</button> : null }
                    </div>
                );
            })}
        </div>
    )
};

export default Posts;