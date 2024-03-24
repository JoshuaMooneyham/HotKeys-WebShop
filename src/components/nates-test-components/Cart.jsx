import { useState } from "react";

function CartItem({item, cart, setCart}) {
    const [test, toggleTest] = useState(false);
    console.log(cart)
    return(
        <div>
            <form onSubmit={() => {
                console.log(cart, cart.indexOf(item));
                if (cart.indexOf(item) !== -1) { 
                    cart.splice(cart.indexOf(item), 1);
                    window.localStorage.setItem('cartItems', JSON.stringify(cart));
                    setCart(cart);
                    toggleTest(!test);
            }}}>
            <img src={item.images[0]} alt="gfn" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button type="submit">Remove from cart</button>
            </form>
        </div>
    );
}

export default function TestCart ({cart, setCart}) {
console.log(cart);

    return (
        <div>
            <h1>CART</h1>
            {cart.map((item) => <CartItem item={item} cart={cart} setCart={setCart}/>)}
        </div>
    );
}