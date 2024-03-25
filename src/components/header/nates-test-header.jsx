// experiment for react-router-dom
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";


import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function TestHeader () {

    return (
        <nav className='nav'>
            <div className="header-icon">
                <img src="hotkey lights.png" alt="header image"></img>
            

                <div className="header-title">
                    <h2 className="sectionHeader">HOT KEYS...   EVERYTHING YOU NEED ALL IN ONE PLACE</h2>
                   
                </div>
            </div>

            <ul className="links">
                <CustomLink to='/'>Home</CustomLink>
                <CustomLink to='/shopping'>Shop</CustomLink>
                
                <CustomLink to='/cart' ><FaShoppingCart id="shoppingIcon" size= "2rem" />
                </CustomLink>
                <CustomLink to='/user' ><MdAccountCircle id ="accountIcon"size= "2rem"/></CustomLink>
                
            </ul>
        </nav>
    );
}

function CustomLink ({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}
