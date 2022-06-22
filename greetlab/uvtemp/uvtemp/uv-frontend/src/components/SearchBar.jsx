import React from 'react'
import "../css/SearchBar.css"

const SearchBar = ({
    value,
    onChange
}) => {
    return (
        <input type="text" 
        className="searchBar"
        placeHolder="Search"
        value={value}
        onChange={ onChange}
         />
    )
}
export default SearchBar;