import React from 'react';
export default function SearchBar ({search}) {
    return (
        <div className='searchbar'>
            <input type='text' autoFocus="autofocus" placeholder='Search Trips' onChange={search}/>
        </div>
    )
}