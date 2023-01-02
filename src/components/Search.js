import React from 'react';

const Search = () => {


    return (
        <fieldset className='searchField'>
            <label htmlFor="keywords">Search All Posts</label>
            <input 
                id="keywords" 
                type="text" 
                placeholder="enter keywords..." 
                // value='' 
                // onChange=''
            />
            <button>Search</button> 
        </fieldset>
    )
};

export default Search;