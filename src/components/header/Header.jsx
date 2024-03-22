function Header() {
    
    return(

    <div className="header-container">
        <div className='header-icon-wrapper'>
            <img src='hotkey lights.png' className="header-icon" />
            <h3>HOT KEYS</h3>
            <h5>EVERYTHING YOU NEED</h5>
        </div>
        <div className="searchbar-wrapper">
            <form>
                <label htmlFor='searchbar'>Search</label>
                <input type="search" name='searchbar' className='header-searchbar' />
            </form>
        </div>
        <div className="nav-buttons-wrapper">
            <button type="button" name="cart" className="btn cart-btn">cart</button>
            <button type="button" name='user' className="btn user-btn">user</button>
        </div>
    </div>
    );
}

export default Header;