import { useState } from "react"

function ViewAccount({ curUse, setCurUse, state }) {

    return(
        <div className='account-view'>
            <h1 className="account-view-greeting">Hello {curUse.name}!</h1>
            <img src={curUse.avatar} alt="pfp" class='account-view-pfp'/>

            <button className='account-view-edit acc-btn' onClick={() => state(2)}>EDIT ACCOUNT</button>
            <button className='account-view-logout acc-btn' onClick={() => setCurUse(null)}>LOG OUT</button>
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
        <div>
            <img src={curUse.avatar} alt="pfp" style={{height: '500px'}}/>

            {updateImageUrl ? 
                <div>
                    <input type="text" onChange={e => setImageUrl(e.target.value)}/>
                    <button onClick={() => {
                        curUse.avatar = imageUrl;
                        window.localStorage.setItem('currentUser', JSON.stringify(curUse))
                        putUserData({'avatar': imageUrl})
                        toggleImageUrl(!updateImageUrl);
                    }}>
                        APPLY
                    </button>
                </div> : 
            <button onClick={() => toggleImageUrl(!updateImageUrl)}>CHANGE PHOTO</button>}
            
            <h1>{curUse.name}</h1>
            
            {updateUsername ? 
                <div>
                    <input type="text" onChange={e => setUsername(e.target.value)}/>
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
            : ''}
        </div>
    );
}



// export default function MyAccount({ curUse, setCurUse }) {
//     const [edit, toggleEdit] = useState(false);
//     const [url, setUrl] = useState('');

//     return (
//         <div>
//             <h1>Welcome {curUse.name}!</h1>
//             <img src={curUse.avatar} alt="pfp" />
//             {/* PFP CHANGE | render a button that switches to an input on click */}
//             {edit ? 
//                 <div>
//                     <input type="text" onChange={e => setUrl(e.target.value)}/>
//                     <button onClick={() => {
//                         curUse.avatar = url;
//                         window.localStorage.setItem('currentUser', JSON.stringify(curUse))
//                         fetch(`https://api.escuelajs.co/api/v1/users/${curUse.id}`, {
//                             method: 'PUT', 
//                             headers: {
//                                 "Content-Type": "application/json"
//                             }, 
//                             body: JSON.stringify({'avatar': url})
//                         })
//                         toggleEdit(!edit);
//                     }}>
//                         Update
//                     </button>
//                 </div> : 
//             <button onClick={() => toggleEdit(!edit)}>EDIT ACCOUNT</button>}
//             <button onClick={() => setCurUse(null)}>LOG OUT</button>
//         </div>
//     )
// }