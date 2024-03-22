import { useState } from "react";

function ItemCard({item}) {
    const [clicked, setClicked] = useState(false);

    return(
        <div className={clicked ? 'clicked removal-card' : 'removal-card'} onClick={() => {setClicked(!clicked)}} onClick={(e) => {console.log(e)
        e.target.className = 'clicked'}}>
            <p>{item.title}</p>
        </div>
    );
}

export default function RenderAllItems({ITEMS}) {
    return (
    <div className="removal-container" onClick={e => console.log(e)}>
        {ITEMS.map((indiv) => <ItemCard item={indiv}/>)}
    </div>
    )
}