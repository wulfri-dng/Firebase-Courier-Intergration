import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react"

export const UserRegister = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (result) => {
        setEmail(result.target.value)
    }

    const handlePasswordChange = (result) => {
        setPassword(result.target.value)
    }

    const handleSubmitClicked = () => {
        createUserWithEmailAndPassword(props.auth, email, password)
            .then((userCredential) => {
                setEmail('');
                setPassword('');
                props.setCurrentUser(userCredential.use);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div style={{ width: "450px", margin: "auto", marginTop: "80px" }}>
            <h2>User Registration</h2>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={handleEmailChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={handlePasswordChange} />
            </div>
            <button className="btn btn-primary" onClick={handleSubmitClicked}>Submit</button>
        </div >
    )
}