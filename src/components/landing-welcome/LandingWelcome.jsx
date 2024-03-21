import { GetData, PostData, PutData, DeleteData, testObj } from '../crud-requests/CrudRequests.jsx'
import FeaturedCard from '../featured-card/FeaturedCard.jsx'

function randomizedCall() {
    const results = GetData();

    const RANDOMLIST = []
    for (let i=0; i<6; i++) {
        RANDOMLIST.push(results[Math.floor(Math.random()*results.length)])
    }
    return RANDOMLIST;
} 

function LandingWelcome() {
    let data = randomizedCall();
    PostData(testObj);
    console.log(GetData());
    console.log(data)
    return (
        <div className='welcome-container'>
            <img src='welcome banner.png' className='welcome-banner'/>
                <div className='featured'>
                    <h2 className='featured-title'>FEATURED</h2>
                    {/* {data.map(indiv => <FeaturedCard productListing={indiv}/>)} */}
                </div>
        </div>
    );
}

export default LandingWelcome;