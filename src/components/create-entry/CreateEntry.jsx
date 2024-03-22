import { GetData, PostData } from "../crud-requests/CrudRequests";
import { useState } from "react";



export default function CreateEntry() {
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [desc, setDesc] = useState(null);
    const [category, setCategory] = useState(1);
    const [images, setImages] = useState(null);

    let data = GetData();


    function submitHandler() {
        fetch('https://api.escuelajs.co/api/v1/products', {
            method: 'POST', 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'title': title,
                'price': price,
                'description': desc,
                'categoryId': category,
                'images': images
            })
        })
    }
    console.log(data);

    return( 
        <div className='add-new-item'>
            <form onSubmit={submitHandler} className='new-item-form'>
                <label htmlFor="title-entry" className="entry-label title-entry-label">Item name:{' '}
                    <input type="text" name="title-entry" className="title-entry" onChange={(e) => {
                        setTitle(e.target.value);
                    }} onBlur={(e) => console.log(e)}/>
                </label>

                <label htmlFor="price-entry" className='entry-label price-entry-label'>Price:{' '}
                    <input type="number" name="price-entry" className="entry price-entry" onChange={(e) => {
                        setPrice(Number(e.target.value));
                    }} />
                </label>

                <label htmlFor="desc-entry" className='entry-label desc-entry-label'>Description:{' '}
                    <input type="text" name="desc-entry" className="entry desc-entry" onChange={(e) => {
                        setDesc(e.target.value);
                    }} />
                </label>

                <label htmlFor="cat-entry" className='entry-label cat-entry-label'>Category:{' '}
                    <input type="text" name="cat-entry" className="entry cat-entry" onChange={(e) => {
                        const lowerValue = e.target.value.toLocaleLowerCase()
                        setCategory(
                            lowerValue == 'clothes' ? 1 :
                            lowerValue == 'electronics' || lowerValue == 'electronic' ? 2 :
                            lowerValue == 'furniture' ? 3 :
                            lowerValue == 'shoes' ? 4 :
                            lowerValue == 'misc' || lowerValue == 'miscellaneous' ? 5 : 0
                        );
                    }} />
                    {category == 0 ? <span>Please enter a valid category! (clothes, electronics, furniture, shoes, miscellaneous)</span> : ''}
                </label>

                <label htmlFor="image-entry" className='entry-label image-entry-label'>Image URL:{' '}
                    <input type="text" name="image-entry" className="entry image-entry" onChange={(e) => {
                        setImages([e.target.value]);
                    }} />
                </label>

                {title && price && desc && category > 0 && images ? <button type="submit">Submit</button> : ''}

            </form>
        </div>
    );
}