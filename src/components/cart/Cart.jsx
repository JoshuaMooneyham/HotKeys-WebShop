import { useState } from "react";

function CartItem({item, cart, setCart}) {

    return(
        <div className="cart-container">
            <div className="cart-card">
                <div className="cart-card-image-box">
                    <img src={item.images[0]} alt="gfn" />
                </div>
                <div className="cartWOImage">
                    <div className="cart-name-and-price">
                        <h2 className="cart1">{item.title}</h2>
                        <h3 className="cart2">Price: ${item.price}</h3>
                    </div>
                    <button 
                        className="cart3" 
                        type="button"
                        onClick={() => {
                            if (cart.indexOf(item) !== -1) { 
                                cart.splice(cart.indexOf(item), 1);
                                window.localStorage.setItem('cartItems', JSON.stringify(cart));
                                setCart([...cart])
                    }}}>Remove from cart</button>
                </div>
            </div>
        </div>
    );
}

export default function TestCart ({cart, setCart}) {
    let total = cart.reduce((accumulator, items) => accumulator + items.price, 0);
    const [checkout, toggleCheckout] = useState(false);

    return (
        <div className="overall-cart-container" >
            <div className="cart-header">
                <h1 className="sectionHeader">CART</h1>
            </div>
            <div className="cart-items">
                {cart.map((item) => <CartItem item={item} cart={cart} setCart={setCart}/>)}
            </div>
            <div className="checkoutContainer">
                <div>
                    <button className="clear-button" onClick={() => setCart([])}>CLEAR CART</button>
                </div>
                <div className= "subtotal">{checkout ? 'Shipped!' :
                `Subtotal: $${total}`}
                </div>
                <div>
                    <button className='checkout-button' onClick={() => {
                        setCart([]);
                        toggleCheckout(true);
                    }}>CHECKOUT</button>
                </div>
            </div>
        </div>
    );
}

