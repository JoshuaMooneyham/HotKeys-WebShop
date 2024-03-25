import { useState } from "react"
import { NewProduct } from "../create-entry/CreateEntry";
import RenderAllItems from "../delete-entry/DeleteEntry";

function ViewAccount({ curUse, setCurUse, state }) {

    return(
        <div className='account-view'>
            <h1 className="account-view-greeting">Hello {curUse.name}!</h1>
            <img src={curUse.avatar} alt="pfp" className='account-view-pfp'/>

            <div className={`account-btn-container ${curUse.role == 'admin' ? 'admin-btn-container' : 'customer-btn-container'}`}>
                <button className='account-view-sell acc-btn' onClick={()=> state(3)}>SELL AN ITEM</button>
                {curUse.role == 'admin' && <button className='account-view-remove acc-btn' onClick={() => state(4)}>REMOVE PRODUCTS</button>}
                <button className='account-view-edit acc-btn' onClick={() => state(2)}>EDIT ACCOUNT</button>
                <button className='account-view-logout acc-btn' onClick={() => setCurUse(null)}>LOG OUT</button>
            </div>
        </div>
    );
}

function EditAccount({curUse, state}) {
    const [imageUrl, setImageUrl] = useState(undefined);
    const [username, setUsername] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [updateImageUrl, toggleImageUrl] = useState(false);
    const [updateUsername, toggleUsername] = useState(false);
    const [updateEmail, toggleEmail] = useState(false);
    const [passState, setPassState] = useState(1);
    const [passwordVerifier, togglePasswordVerifier] = useState(true);
    const [testPass, setTestPass] = useState('')

    const putUserData = (obj) => {
        fetch(`https://api.escuelajs.co/api/v1/users/${curUse.id}`, {
            method: 'PUT', 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(obj)
        })
    };

    return(
        <div className="edit-user-container">
            <div className="outer-edit-wrapper">
                <h1 className="outer-edit-header">Click to Update!</h1>
                <p className="new-item-cancel edit-user-cancel" onClick={() => state(1)}>{'Go Back>'}</p>
                <div className="edit-wrapper">

                    <div className="update-pfp-wrapper">
                        <img className='edit-user-pfp-image' src={curUse.avatar} alt="pfp"/>

                        {updateImageUrl ? 
                            <div className="cancel-div">
                                <input 
                                    className="update-input pfp-update-input"
                                    placeholder='Enter Image URL' 
                                    type="url" 
                                    onChange={e => setImageUrl(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            curUse.avatar = imageUrl
                                            window.localStorage.setItem('currentUser', JSON.stringify(curUse))
                                            putUserData({'avatar': imageUrl})
                                            toggleImageUrl(!updateImageUrl)
                                        }
                                    }}/>
                                    
                                <span className='cancel-span' onClick={() => {
                                    toggleImageUrl(!updateImageUrl)
                                }}>
                                    Cancel
                                </span>
                            </div> : 
                        <div className="update-pfp-span-buffer">
                            <p className='update-pfp-span' onClick={() => toggleImageUrl(!updateImageUrl)}>Change Profile Image</p>
                        </div>
                        }
                    </div>

                    <div className="everythingElse">
                        <div className="update-username">
                        {updateUsername ? 
                            <div className="update-username">
                                <h1 className="update-username-header update-header-label">{`Username: `}</h1>
                                <input 
                                    className="update-input username-update-input"
                                    type="text" 
                                    placeholder={'Current: ' + curUse.name}
                                    onChange={e => setUsername(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            curUse.name = username;
                                            window.localStorage.setItem('currentUser', JSON.stringify(curUse))
                                            putUserData({'name': username})
                                            toggleUsername(!updateUsername)
                                        }
                                    }}
                                />
                                <span className="cancel-span" onClick={() => toggleUsername(!updateUsername)}>Cancel</span>
                            </div>
                        : 
                            <div className="update-header-buffer update-user-header-buffer">
                                <h1 className='update-username-header update-header' onClick={() => toggleUsername(!updateUsername)}>{`Username: ${curUse.name}`}</h1>
                            </div>
                        }
                        </div>

                        <div className="update-email">
                        {updateEmail ? 
                            <div>
                                <h1>{`Email: `}</h1>
                                <input 
                                    type='email' 
                                    placeholder={curUse.email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            curUse.email = username;
                                            window.localStorage.setItem('currentUser', JSON.stringify(curUse))
                                            putUserData({'email': email})
                                            toggleEmail(!updateEmail)
                                        }
                                    }}
                                />
                                <span onClick={() => toggleEmail(!updateEmail)}>Cancel</span>
                            </div>
                        : 
                            <div>
                                <h1 onClick={() => toggleEmail(!updateEmail)}>{`Email: ${curUse.email}`}</h1>
                            </div>
                        }
                        </div>

                        <div className="update-password">
                        {passState === 3 ? //update password state
                            <div className="password-buffer">
                                <h1>{`Password: ${curUse.password}`}</h1>
                                <input 
                                    type='text'
                                    placeholder='Enter new password..'
                                    onChange={e => setPassword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            curUse.password = password;
                                            window.localStorage.setItem('currentUser', JSON.stringify(curUse))
                                            putUserData({'password': password})
                                            setPassState(1)
                                        }
                                    }}
                                />
                                <span onClick={() => {
                                    setPassState(1);
                                    togglePasswordVerifier(true);
                                }}>Cancel</span>
                            </div>

                        : passState === 2 ? // verify password state

                            <div className="password-buffer">
                                <h1>{`Password: ${curUse.password.replace(/[\w]/g, '*')}`}</h1>
                                <input 
                                    placeholder="Verify password"
                                    type="password"
                                    onChange={(e) => {
                                        setTestPass(e.target.value)
                                    }} 
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            if (testPass === curUse.password) {
                                                togglePasswordVerifier(true)
                                                setPassState(3)
                                            } else {
                                                togglePasswordVerifier(false)
                                            }
                                        }
                                    }}/>
                                <span onClick={() => {
                                    setPassState(1);
                                    togglePasswordVerifier(true);
                                }}>Cancel</span>
                                {!passwordVerifier && <span>The password you entered is not correct!</span>}
                            </div>
                        :
                            <div className="password-buffer">
                                <h1 onClick={() => setPassState(2)}>{`Password: ${curUse.password.replace(/[\w]/g, '*')}`}</h1>
                            </div>
                        }
                            {/* <div className="password-buffer"></div> */}
                        </div>
                    </div>
                </div> 
            </div>
                {/* <p className="new-item-cancel edit-user-cancel" onClick={() => state(1)}>Go Back</p> */}
        </div>
    );
}

export default function MyAccount({ curUse, setCurUse }) {
    const [state, setState] = useState(1)
    return(
        <div className="account-wrapper">
            { state == 1 ? 
            <ViewAccount curUse={curUse} setCurUse={setCurUse} state={setState}/> 
            : state == 2 ? 
            <EditAccount curUse={curUse} state={setState}/>
            : state == 3 ? 
            <NewProduct setState={setState}/>
            : <RenderAllItems />}
        </div>
    );
}
