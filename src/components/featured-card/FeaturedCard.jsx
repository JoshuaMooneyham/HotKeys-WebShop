export default function FeaturedCard ({productListing, shoppingCart, addToCart }) {
    
    return (
    
        <div className='card'>
            {/* <img src={productListing.images[0]} alt='product image' className='featured-product-img'></img> */}
            <div className="featured-card-container">
            <img src={productListing.images[0]} alt='product image' className='featured-product-img'></img>
                <div className="featuredWOImage">
                <div className="featured-card-text">
                    <h2 className='featured-product-title'>{productListing.title}</h2>
                    <h2>in {productListing.category.name}</h2>
                    <h3>${productListing.price}</h3>
                </div>
                <button className="featured-card-button" onClick={() => addToCart([...shoppingCart, productListing])}>{shoppingCart.includes(productListing) ? 'Added!' : 'Add to Cart'}</button>
                </div>
            </div>
        </div>
    );
}
