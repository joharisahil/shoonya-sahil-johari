import React from 'react';

const SearchBar = ({ onSearch }) => (
  <input
    className='search-bar'
    type="text"
    placeholder="Search retreats by title"
    onChange={e => onSearch(e.target.value)}
  />
);

export default SearchBar;
