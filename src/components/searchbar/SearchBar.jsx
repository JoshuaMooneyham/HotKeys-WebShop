import { useState } from "react";

export default function  SearchBar({ setInput }){
    // const handleChange = (event) => {
    //     setInput(event.target.value);
    //     }

    return(
        <div className = "searchBarContainer">
            <div className="input-wrapper">
                {/* <FaSearch id="search-icon"/> */}
                <input placeholder="Type to search..."
                  type="text"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setInput(e.target.value);
                  }}/>
            </div>
        </div>
    );
}