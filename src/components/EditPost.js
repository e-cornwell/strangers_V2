import React, { useState } from 'react';

const EditPost = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState({});
    const token = props.token;
    const posts = props.posts;
    const setPosts = props.setPosts;
    const fetchPosts = props.fetchPosts;

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
        const json = await response.json(); 
        
        if(json && json.title){
            const newPosts = posts.map(post => {
                if(post._id === postId){
                    return json;
                } else {
                    return post;
                }
            });
            setPosts([...posts, newPosts]);
            fetchPosts();
        }
    }

    return (

        <form>
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
            <fieldset>
                <legend>Will Deliver?</legend>

                <input type="checkbox" id="yes" name="yes" onChange={ev => setWillDeliver(ev.target.value)} value={true}/>
                <label>Yes</label>
                              
                <input type="checkbox" id="no" name="no" onChange={ev => setWillDeliver(ev.target.value)} value={false}/>
                <label>No</label>
            </fieldset>
            
            <button onClick={ handleSubmit }>Edit Post</button>
        </form>
    );  
};

export default EditPost;