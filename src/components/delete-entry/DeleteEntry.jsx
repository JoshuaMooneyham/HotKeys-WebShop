import { useState } from "react";
import { GetProducts } from "../crud-requests/CrudRequests";

// ====={ Renders out every current product to let you choose one to delete }=====
export default function RenderAllItems() {

    let [data, setData] = useState([]);
    data = GetProducts();
    
    let selected = null;

    // ====={ Formats each individual item card }=====
    function ItemCard({item}) {
    
        return(
            <button id={item.id} className='removal-card' 
                onFocus={(e) => {
                    selected = e.target.getAttribute('id');
                    e.target.classList.add('selected');
                }} 
                onBlur = {(e)=> {
                    e.target.classList.remove('selected')
                }}>
                <img src={item.images[0]}/>
                {item.title}
            </button>
        );
    }

    return (
        <div className="removal-wrapper">
            <div className="removal-container">
                {data.map((indiv) => <ItemCard item={indiv}/>)}
            </div>
            <button onClick={() => {
                fetch('https://api.escuelajs.co/api/v1/products/'+ selected, {
                    method: 'DELETE'
                });
                setData(data.map(element => {
                    if (element.id == selected) {
                        data.splice(data.indexOf(element), 1);
                        console.log(data)
                    }
                }));
            }}>Delete
            </button> 
        </div>
    )
}