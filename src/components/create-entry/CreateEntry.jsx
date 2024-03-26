import { GetUsers } from "../crud-requests/CrudRequests";
import { useState } from "react";



export function NewProduct({ setState }) {
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [desc, setDesc] = useState(null);
    const [category, setCategory] = useState(1);
    const [images, setImages] = useState(null);

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

    return( 
        <div className="wrapper">
            <div className='add-new-item'>
                <p className="new-item-cancel" onClick={() => {
                    setState(1)
                }}>{'Go Back >'}</p>
                <form className='new-item-form' onSubmit={submitHandler}>
                    <label htmlFor="title-entry" className="entry-label title-entry-label">Item name:{' '}</label>
                    <input type="text" name="title-entry" className="title-entry entry" onChange={(e) => {
                        setTitle(e.target.value);
                    }} />

                    <label htmlFor="price-entry" className='entry-label price-entry-label'>Price:{' '}</label>
                    <input type="number" name="price-entry" className="entry price-entry" onChange={(e) => {
                        setPrice(Number(e.target.value));
                    }} />

                    <label htmlFor="desc-entry" className='entry-label desc-entry-label'>Description:{' '}</label>
                    <input type="text" name="desc-entry" className="entry desc-entry" onChange={(e) => {
                        setDesc(e.target.value);
                    }} />

                    <label htmlFor="cat-entry" className='entry-label cat-entry-label'>Category:{' '}</label>
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
                    {category == 0 ? <span className="item-valid">* Please enter a valid category! (clothes, electronics, furniture, shoes, miscellaneous)</span> : ''}

                    <label htmlFor="image-entry" className='entry-label image-entry-label'>Image URL:{' '}</label>
                    <input type="text" name="image-entry" className="entry image-entry" onChange={(e) => {
                        setImages([e.target.value]);
                    }} />

                    {title && price && desc && category > 0 && images ? <button className='create-user-btn new-item-btn' type="submit">Submit</button> : ''}
                
                </form>
            </div>
        </div>
    );
}

export function NewUser({ setCurUse }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('customer');
    const image = 'https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png';
    const [testUser, toggleTestUser] = useState(true);
    const [testPassword, toggleTestPassword] = useState(true);
    const [testEmail, toggleTestEmail] = useState(true);

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

    function checkEmail() {
        return /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]+[a-z]+/i.test(email);
    }

    function checkPassword() {
        return password.length > 3;
    }

    function checkUsername() {
        return username.length > 1;
    }

    return( 
        <div className='add-new-user'>
            <div className="new-user-form">
                <div className="create-account-inputs">
                    <div className="indiv-input-wrapper">
                        <label htmlFor="email-entry" className="entry-label email-entry-label">email:{' '}</label>
                        <input type="text" name="email-entry" className="entry email-entry" onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                        {!testEmail && <span className="create-invalid">Please enter a valid fake email</span>}
                    </div>
                    <div className="indiv-input-wrapper">
                        <label htmlFor="username-entry" className='entry-label username-entry-label'>username:{' '}</label>
                        <input type="text" name="username-entry" className="entry username-entry" onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                        {!testUser && <span className="create-invalid">Please enter a valid username (at least 2 characters)</span>}
                    </div>
                    <div className="indiv-input-wrapper">
                        <label htmlFor="password-entry" className='entry-label password-entry-label'>password:{' '}</label>
                        <input type="password" name="password-entry" className="entry password-entry" onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                        {!testPassword && <span className="create-invalid">Please enter a valid password (at least 4 characters)</span>}
                    </div>
                </div>
                <div className="admin-check-wrapper">
                    <label htmlFor="admin-check" className="ac-label">Admin?</label>
                    <input className='admin-check' type="checkbox" name='admin-check' onClick={() => {
                        role === 'customer' ? setRole('admin') : setRole('customer');
                    }}/>
                </div>

                <button 
                    className='create-user-btn' 
                    type="button"
                    onClick={() => {
                        if (checkEmail() && checkPassword() && checkUsername()) {
                            submitHandler()
                        } else {
                            toggleTestEmail(checkEmail());
                            toggleTestPassword(checkPassword());
                            toggleTestUser(checkUsername());
                        }
                    }}>Submit</button>
            </div>
        </div>
    );
}

export function LogIn({setCurUse}) {
    
    let [pass, setPass] = useState('');
    let [login, setLogin] = useState('');
    let [validCheck, setValidCheck] = useState(true);
    let [createOrLogin, toggleCOL] = useState(true);
    let userList = GetUsers();
    let foundUser = null;

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
        <div className="bs-container">
            <h1 className="login-header">{createOrLogin ? 'Create an account' : 'Log In'}</h1>
            { !createOrLogin ? 
            <div className='login-container'>
                <div className="create-account-inputs">
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
                        }} 
                    />
                </div>
                {validCheck ? '' : <span className="valid-span">*The combination you entered is incorrect!</span>}
                <button 
                    className="create-user-btn"
                    type="btn" 
                    onClick={() => {
                        findUser();
                        setCurUse(foundUser);
                        setLogin('')
                        setPass('')
                    }}>Submit
                </button>
            </div> 
            : <NewUser setCurUse={setCurUse}/>}
            <div className="login-spans">
                <span className="stat-span">{createOrLogin ? 'Already have an account? ' : "Don't have an account? "}</span>
                <span className='link-span' onClick={()=> toggleCOL(!createOrLogin)}>{createOrLogin ? 'Log In' : 'Create One'}</span>
            </div>
        </div>
    )
}