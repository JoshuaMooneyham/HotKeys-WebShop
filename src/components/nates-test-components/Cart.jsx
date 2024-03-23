import FeaturedCard from "../featured-card/FeaturedCard";

export default function TestCart ({cart}) {
console.log(cart);

    return (
        <div>
            <h1>CART</h1>
            {cart.map((item) => <h1>{item.title}</h1>)}
        </div>
    );
}