import React, { useState, useEffect } from 'react';
import './../assets/SearchBar.css';

function SearchBar({ data, onSearch, getAll }) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (searchText.length === 0) {
            getAll();
            return;
        }

        const foundImage = data.find(image => image.name.includes(searchText));
        onSearch(foundImage);
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const searchBar = document.getElementById('search-bar');
        if (searchBar) {
            const shouldStick = window.scrollY > searchBar.offsetTop;
            if (shouldStick) {
                searchBar.classList.add('sticky');
            } else {
                searchBar.classList.remove('sticky');
            }
        }
    };

    return (
        <div id="search-bar" className='search-bar max-w-sm rounded overflow-hidden my-10 mx-auto'>
            <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                <input
                    type="text"
                    placeholder="Поиск по имени..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
                <button
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    onClick={handleSearch}
                >
                    Искать
                </button>
            </div>
            <button onClick={handleScrollToTop}>Наверх</button>
        </div>
    );
}

export default SearchBar;
