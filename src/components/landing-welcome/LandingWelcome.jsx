function LandingWelcome() {
    return (
        <div className='welcome-container'>
            {/* Need Image from Kera */}
            <img src='welcome banner.png' className='welcome-banner'/>
                <div className='featured'>
                    <h2 className='featured-title'>FEATURED</h2>
                    {/* placeholder, probably take a random dataset and map it? */}
                    {/* <FeaturedCard /> */}
                </div>
        </div>
    );
}

export default LandingWelcome;