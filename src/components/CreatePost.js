import React, { useState } from 'react';
 

const CreatePost = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState({});
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
                setPosts([...posts, result.data.post]);
                fetchPosts();
                setTitle('');
                setDescription('');
                setPrice('');
                setLocation('');
                setWillDeliver({});
            })
        .catch(error => console.log(error));
    }

    return (
        
            <form className='createPost' onSubmit={ handleSubmit }>
                <h3>Create a Post</h3>
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
                
                <button>Create Post</button>
            </form>
    );
};

export default CreatePost;