import React from 'react';

function SearchBar ({search}) {
    return (
        <div className='searchbar'>
            <input type='text' autofocus="autofocus" placeholder='Search Your Trips' onChange={search}/>
        </div>
    )
}


export default SearchBar;