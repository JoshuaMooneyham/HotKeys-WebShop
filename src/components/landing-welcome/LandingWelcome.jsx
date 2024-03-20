function LandingWelcome() {
    <div className='welcome-container'>
        {/* Need Image from Kera */}
        <img src='' className='welcome-banner'/>
            <div className='featured'>
                <h2 className='featured-title'>FEATURED</h2>
                <FeaturedCard />
            </div>
    </div>
}

function DeleteData(id) {
    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
            method: 'DELETE'
        })
    }, [])
}