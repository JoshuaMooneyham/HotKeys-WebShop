// experiment for react-router-dom

import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function TestHeader () {

    return (
        <nav className='nav'>
            <div className="header-icon">
                <img src="hotkey lights.png" alt="header image"></img>
            

                <div className="header-title">
                    <h1>HOT KEYS</h1>
                    <h2>EVERYTHING YOU NEED</h2>
                </div>
            </div>

            <ul className="links">
                <CustomLink to='/'>Home</CustomLink>
                <CustomLink to='/shopping'>Shop All</CustomLink>
                <CustomLink to='/cart'>Cart</CustomLink>
                <CustomLink to='/user'>User</CustomLink>
                
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
