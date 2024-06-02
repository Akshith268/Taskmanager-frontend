import React, { useState } from 'react';
import './search.scss';

export default function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    // Call the onSearch function passed from the parent component
    // to pass the search query back to the parent for filtering tasks
    onSearch(value);
  };

  return (
    <div className='search'>
      <input
        type='text'
        placeholder='Search'
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
}
