import { useState } from "react";
import {FaSearch} from "react-icons/fa";

export default function  SearchBar({ setInput }){
    return(
        <header className = "searchBarContainer">
            <div className="input-wrapper">
                <FaSearch id="search-icon"/>
                <input placeholder="Type to search..."
                  type="text"
                  onChange={(e) => {
                    console.log('test', e.target.value);
                    setInput(e.target.value);
                  }}/>
            </div>
        </header>
    );
}