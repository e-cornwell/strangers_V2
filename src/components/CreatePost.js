 import React, { useState } from 'react';
 

 const CreatePost = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState('');
    const token = props.token;
    //console.log(token)

    const createPost = (ev) => {
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
                if(!result.success){
                    throw result.error;
                }
                console.log(result);
            })
            .catch(error => console.log(error));
        }

    
    
    return (
        <form onSubmit={ createPost }>
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
            <input 
                placeholder='delivery'
                value={ willDeliver } 
                onChange={ ev => setWillDeliver(ev.target.value)} 
            />
            <button>Submit Post</button>
        </form>
    );
};

 export default CreatePost;