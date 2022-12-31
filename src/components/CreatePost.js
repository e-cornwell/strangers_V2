 import React, { useState } from 'react';
 

 const CreatePost = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState('');
    const token = props.token;
    const posts = props.posts;
    const setPosts = props.setPosts;
    const fetchPosts = props.fetchPosts;
    

    const handleSubmit = (ev) => {
        ev.preventDefault();
        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    location,
                    willDeliver: willDeliver
                }
            })
        })  .then(response => response.json())
            .then(result => {
                console.log(result)
                setPosts([...posts, result]);
                fetchPosts();
            })
            .catch(error => console.log(error));
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
            
            <button>Submit Post</button>
        </form>
    );
};

 export default CreatePost;