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
    const [updatePassword, togglePassword] = useState(false);

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
            <img className='edit-user-pfp-image' src={curUse.avatar} alt="pfp"/>

            {updateImageUrl ? 
                <div className="cancel-div">
                    <input 
                        className="update-input"
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
            <p onClick={() => toggleImageUrl(!updateImageUrl)}>Change Profile Image</p>}
            
            <h1>{`Username: ${curUse.name}`}</h1>
            
            {updateUsername ? 
                <div className="cancel-div">
                    <input type="text" 
                        placeholder={curUse.name}
                        onChange={e => setUsername(e.target.value)}/>
                    <button onClick={() => {
                        curUse.name = username;
                        window.localStorage.setItem('currentUser', JSON.stringify(curUse))
                        putUserData({'name': username})
                        toggleUsername(!updateUsername);
                    }}>
                        APPLY
                    </button>
                </div> : 
            <button onClick={() => toggleUsername(!updateUsername)}>EDIT NAME</button>}

            <h2>{curUse.email}</h2>
            
            {updateEmail ? 
                <div>
                    <input type="text" onChange={e => setEmail(e.target.value)}/>
                    <button onClick={() => {
                        curUse.email = email;
                        window.localStorage.setItem('currentUser', JSON.stringify(curUse))
                        putUserData({'email': email})
                        toggleEmail(!updateEmail);
                    }}>
                        Apply
                    </button>
                </div> : 
            <button onClick={() => toggleEmail(!updateEmail)}>UPDATE EMAIL</button>}

            {updatePassword ? 
                <div>
                    <input type="text" onChange={e => setPassword(e.target.value)}/>
                    <button onClick={() => {
                        curUse.password = password;
                        window.localStorage.setItem('currentUser', JSON.stringify(curUse))
                        putUserData({'password': password})
                        togglePassword(!updatePassword);
                    }}>
                        Apply
                    </button>
                </div> : 
            <button onClick={() => togglePassword(!updatePassword)}>CHANGE PASSWORD</button>}

            <button onClick={() => state(1)}>BACK</button>
            
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
            <NewProduct />
            : <RenderAllItems />}
        </div>
    );
}
