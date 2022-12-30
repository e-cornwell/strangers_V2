import React, { useState } from 'react';

const EditPost = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState('');
    const token = props.token;
    const posts = props.posts;
    const setPosts = props.setPosts;
    const postId = props.postId;
    const setPostId = props.setPostId;
    

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const response = await fetch(`http://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${postId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    location: location,
                    willDeliver: willDeliver
                }
            })
        });
        const data = await response.json(); 
        console.log(data);
        if(data && data.title){
            const newPosts = posts.map(post => {
                if(post._id === postId){
                    return data;
                } else {
                    return post;
                }
            });
            setPosts(newPosts);
            setTitle('')
            setDescription('')
            setPrice('')
            setLocation('')
            setWillDeliver('')
            setPostId(null)

        }
    }

    return (

        <form onSubmit={ handleSubmit }>
            <input 
                placeholder='title'
                value={ title } 
                onChange={ ev => setTitle(ev.target.value)} 
            />
            <input 
                placeholder='description'
                value={ description } 
                onChange={ ev => setDescription(ev.target.value)} 
            />
            <input 
                placeholder='price'
                value={ price } 
                onChange={ ev => setPrice(ev.target.value)} 
            />
            <input 
                placeholder='location'
                value={ location } 
                onChange={ ev => setLocation(ev.target.value)} 
            />
            <label>
                Will Deliver:   
                <select value={ willDeliver } onChange={ ev => setWillDeliver(ev.target.value)}>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                </select>
            </label>
            
            <button>Edit Post</button>
        </form>
    );  
};

export default EditPost;