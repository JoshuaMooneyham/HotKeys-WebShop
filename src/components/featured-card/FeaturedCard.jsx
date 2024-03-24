// import { photoFormatter } from "../crud-requests/CrudRequests";



export default function FeaturedCard ({productListing, shoppingCart, addToCart }) {
    // productListing.images = photoFormatter(productListing.images);
    
    // on click, we want to grab the id of the item in the card

    // const getProductListingId = () => {
        // console.log(productListing)
        // let cart = window.localStorage.getItem('cartItems')
        // console.log(cart)

        // addToCart([...shoppingCart, productListing])

    //     window.localStorage.setItem('cartItems', [...cart, productListing])
    // }
    
    
    
    return (
    
        <div className='card'>
            {/* <img src={productListing.images[0]} alt='product image' className='featured-product-img'></img> */}
            <div className="featured-card-container">
                <div className="featured-card-text">
                    <img src={productListing.images[0]} alt='product image' className='featured-product-img'></img>
                    <h2 className='featured-product-title'>{productListing.title}</h2>
                    <p>in {productListing.category.name}</p>
                    <h3>${productListing.price}</h3>
                </div>
                <button className="featured-card-button" onClick={() => addToCart([...shoppingCart, productListing])}>{shoppingCart.includes(productListing) ? 'Added!' : 'Add to Cart'}</button>
            </div>
        </div>
    );
}
