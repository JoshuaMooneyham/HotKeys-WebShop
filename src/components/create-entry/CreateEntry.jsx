import { GetProducts, GetUsers } from "../crud-requests/CrudRequests";
import { useState } from "react";



export function NewProduct() {
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [desc, setDesc] = useState(null);
    const [category, setCategory] = useState(1);
    const [images, setImages] = useState(null);

    let data = GetProducts();


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
                    }} />
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

export function NewUser({ setCurUse }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState('customer');
    const [image, setImage] = useState('https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png');

    let data = GetUsers();


    function submitHandler() {
        fetch('https://api.escuelajs.co/api/v1/users', {
            method: 'POST', 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
                'name': username,
                'role': role,
                'avatar': image
            })
        });
        setCurUse({
            'email': email,
            'password': password,
            'name': username,
            'role': role,
            'avatar': image
        })
    }
    console.log(data);

    return( 
        <div className='add-new-item'>
            <form onSubmit={submitHandler} className='new-item-form'>
                <label htmlFor="title-entry" className="entry-label title-entry-label">email:{' '}
                    <input type="text" name="title-entry" className="title-entry" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                </label>

                <label htmlFor="price-entry" className='entry-label price-entry-label'>username:{' '}
                    <input type="text" name="price-entry" className="entry price-entry" onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                </label>

                <label htmlFor="desc-entry" className='entry-label desc-entry-label'>password:{' '}
                    <input type="text" name="desc-entry" className="entry desc-entry" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </label>

                <button type="submit">Submit</button>

            </form>
        </div>
    );
}

export function LogIn({setCurUse, curUse}) {
    
    let [pass, setPass] = useState('');
    let [login, setLogin] = useState('');
    let [validCheck, setValidCheck] = useState(true);
    let [createOrLogin, toggleCOL] = useState(true);
    let userList = GetUsers();
    let foundUser = null;
    console.log(userList);

    const findUser = () => {
        for (let u in userList) {
            if ((userList[u].name.toLowerCase() == login.toLowerCase() || userList[u].email.toLowerCase() == login.toLowerCase()) && userList[u].password == pass) {
                foundUser = userList[u]
                break
            }
        }
        setValidCheck(false)
    }
    

    return(
        <div>
        <h1>{createOrLogin ? 'Create an account' : 'Log In'}</h1>
        { !createOrLogin ? 
        <div className='login-container'>
            <label 
                htmlFor="login-entry" 
                className='entry-label login-entry-label'
                >Username or Email:{' '}
            </label>

            <input 
                type="text" 
                name="login-entry" 
                className="entry login-entry" 
                value={login} 
                onChange={(e) => {
                    setLogin(e.target.value);
                    }}
            />

            <label 
                htmlFor="password-entry" 
                className='entry-label password-entry-label'
                >Password:{' '}
            </label>    

            <input 
                type="password" 
                name="desc-entry" 
                className="entry desc-entry" 
                value={pass} 
                onChange={(e) => {
                    setPass(e.target.value);
                    console.log(e.target.value)
                }} 
            />

            <button 
                type="btn" 
                onClick={() => {
                    findUser();
                    setCurUse(foundUser);
                    setLogin('')
                    setPass('')
                }}>Submit
            </button>

            {validCheck ? '' : <span>The combination you entered is incorrect!</span>}
            
        </div> : <NewUser setCurUse={setCurUse}/>
    }
    <span>{createOrLogin ? 'Already have an account?' : "Don't have an account?"}</span>
    <button onClick={()=> toggleCOL(!createOrLogin)}>{createOrLogin ? 'Log In' : 'Create One'}</button>
    </div>
    )
}