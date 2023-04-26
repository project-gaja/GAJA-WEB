import React, {useState} from 'react';
import SearchHistory from '../component/search/searchHistory';
import SearchBar from '../component/search/searchBar';

const Search = () => {

    return ( // 화면출력
        <div className='container'>
            
            <div>
                <SearchBar />
                <SearchHistory />
            </div>
        </div>
    );
};

export default Search;