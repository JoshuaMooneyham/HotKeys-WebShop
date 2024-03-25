import { useEffect, useState } from "react";
import { GetProducts } from "../crud-requests/CrudRequests";

// ====={ Renders out every current product to let you choose one to delete }=====
export default function RenderAllItems({ setState }) {

    let [data, setData] = useState([]);
    let [selected, setSelected] = useState(null);
    const [current, setCurrent] = useState(undefined)

    data = GetProducts();

    useEffect(() => {
        console.log('fetching', selected)
        fetch('https://api.escuelajs.co/api/v1/products/' + selected)
            .then(response => response.json())
                .then(data => setCurrent(data))
    }, [selected])

    // ====={ Formats each individual item card }=====
    function ItemCard({item}) {
    
        return(
            <button id={item.id} className={`removal-card ${selected == item.id ? 'selected' : ''}`}>
                <img className='removal-image' src={item.images[0]}/>
                <p className="removal-title">{item.title}</p>
            </button>
        );
    }

    return (
        <div className="removal-wrapper" onClick={(e) => {
            if (e.target.getAttribute('id') !== null) {
                setSelected(e.target.getAttribute('id'))
            } else if (e.target.parentElement.getAttribute('id') !== null) {
                setSelected(e.target.parentElement.getAttribute('id'))
            } else {
                setSelected(null);
            }

            }}>
            <div className="remove-item-header-items">
                <h1 className="removal-header">{current?.title ? `Currently selecting: ${current.title}` : 'Choose an item to delete!'}</h1>
                <span 
                    className="new-item-cancel delete-item-cancel" 
                    onClick={() => {
                        setState(1);
                    }}>{'Go Back>'}</span>
            </div>
            <div className="removal-container">
                {data.map((indiv) => <ItemCard item={indiv}/>)}
            </div>
            <div className="removal-btn-wrapper">
                <button
                    className="confirm-delete"
                    onClick={() => {
                    fetch('https://api.escuelajs.co/api/v1/products/'+ selected, {
                        method: 'DELETE'
                    });
                    setData(data.map(element => {
                        if (element.id == selected) {
                            data.splice(data.indexOf(element), 1);
                            console.log(data)
                        }
                    }));
                }}>CONFIRM
                </button> 

            </div>
        </div>
    )
}