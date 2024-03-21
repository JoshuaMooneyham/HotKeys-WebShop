import { GetData, PostData, PutData, DeleteData } from '../crud-requests/CrudRequests.jsx'

async function randomizedCall() {
    const RANDOMLIST = []
    let products = await GetData()
    console.log(products)
    for (let i=0; i<6; i++) {
        RANDOMLIST.push(products[Math.floor(Math.random()*products.lenth)])
    }
    return RANDOMLIST;
} 

function LandingWelcome() {
    let products = randomizedCall()
    console.log(products)
    return (
        <div className='welcome-container'>
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