
function ShoppingList({item}){                          //Need to know what .something to pull from//
    return (
        <div className = "shopping.list">
            <div>
                <img src = {item.picture}></img>
            </div>
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>{item.price}</p>
            </div>
        </div>
    )
}
//Need to add to pull from search bar///
function FetchApi(){
    const [items, setItems] = useState([]);
    fetch('https://api.escuelajs.co/api/v1/products').then(response => response.json()).then(data => setItems(data));
    return(
        <div className = "shopping.container">
            {items.map(item =>
                <ShoppingList item = {item}/>)}
        </div>
    )
    
}