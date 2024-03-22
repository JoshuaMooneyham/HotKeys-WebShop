import { useState } from "react"

export default function MyAccount({ curUse, setCurUse }) {
    const [newPFP, toggleNewPFP] = useState(false);
    const [url, setUrl] = useState('');

    return (
        <div>
            <h1>Welcome {curUse.name}!</h1>
            <img src={curUse.avatar} alt="pfp" />
            {/* PFP CHANGE | render a button that switches to an input on click */}
            {newPFP ? 
                <div>
                    <input type="text" onChange={e => setUrl(e.target.value)}/>
                    <button onClick={() => {
                        curUse.avatar = url;
                        window.localStorage.setItem('currentUser', JSON.stringify(curUse))
                        fetch(`https://api.escuelajs.co/api/v1/users/${curUse.id}`, {
                            method: 'PUT', 
                            headers: {
                                "Content-Type": "application/json"
                            }, 
                            body: JSON.stringify({'avatar': url})
                        })
                        toggleNewPFP(!newPFP);
                    }}>
                        Update
                    </button>
                </div> : 
            <button onClick={() => toggleNewPFP(!newPFP)}>Change Profile Picture</button>}
            <button onClick={() => setCurUse(null)}>LOG OUT</button>
        </div>
    )
}