import React, { useEffect, useState } from 'react';
import Suggestions from './Suggestions';
import './styles.css';

const SearchAutocomplete = ({ url }) => {
    const [users, setUsers] = useState([]);
    const [searchParam, setSearchParam] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    function handleChange(e) {
        const query = e.target.value.toLowerCase();
        setSearchParam(query);
        if (query.length > 1) {
            const filteredData = users?.length
                ? users.filter(user => user.toLowerCase().indexOf(query) > -1)
                : [];
            setFilteredUsers(filteredData);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }

    function handleClick(e) {
        console.log(e.target.innerText);
        setShowDropdown(false);
        setSearchParam(e.target.innerText);
        setFilteredUsers([]);
    }

    async function fetchUserList() {
        try {
            setLoading(true);
            setErrorMsg(null);
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            // console.log(data)
            if (data?.users?.length) setUsers(data.users.map(user => user.firstName));
        } catch (err) {
            console.log(err);
            setErrorMsg(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (url) {
            fetchUserList();
        }
    }, [url])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (errorMsg) {
        return <p>Error: {errorMsg}</p>
    }

    console.log(users, filteredUsers);

    return (
        <div className='search-autocomplete-container'>

            <input
                onChange={handleChange}
                value={searchParam}
                type="text"
                name="search-users"
                placeholder='Search Users...'
            />
            {showDropdown && <div><Suggestions handleClick={handleClick} data={filteredUsers} /></div>}
        </div>
    );
}

export default SearchAutocomplete;