import { GetData, PostData, testObj } from '../crud-requests/CrudRequests.jsx'
import FeaturedCard from '../featured-card/FeaturedCard.jsx'

function randomizedCall() {
    const results = GetData();
    const RANDOMLIST = [];

    while (results.length !== 0 && RANDOMLIST.length < 6) {
        let randomNumber = Math.floor(Math.random()*results.length);

        if (RANDOMLIST.includes(results[randomNumber])) {
            continue;
        } else {
            RANDOMLIST.push(results[randomNumber]);
        }
    } 
    return RANDOMLIST;
}

function LandingWelcome() {
    let featured = randomizedCall();
    console.log(featured);

    return (
        <div className='welcome-container'>
            <img src='welcome banner.png' className='welcome-banner'/>
                <div className='featured'>
                    <h2 className='featured-title'>FEATURED</h2>
                    {featured.length > 0 ? featured.map(indiv => <FeaturedCard productListing={indiv}/>) : 'Loading..'}
                </div>
        </div>
    );
}

export default LandingWelcome;