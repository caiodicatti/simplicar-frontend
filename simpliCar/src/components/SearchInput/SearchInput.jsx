import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchInput.css';

function SearchInput({ value, onChange, onSearch, placeholder }) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') onSearch();
    };

    return (
        <div className="search-input-wrapper">
            <input
                type="text"
                className="form-control"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
            <button className="btn btn-primary" type="button" onClick={onSearch}>
                <FaSearch />
            </button>
        </div>
    );
}

export default SearchInput;