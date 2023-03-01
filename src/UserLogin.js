import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react"
import axios from "axios";

export const UserLogin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);

    const handleEmailChange = (result) => {
        setEmail(result.target.value)
    }

    const handlePasswordChange = (result) => {
        setPassword(result.target.value)
    }

    const handleSubmitClicked = () => {
        signInWithEmailAndPassword(props.auth, email, password)
            .then((userCredential) => {
                setEmail('');
                setPassword('');
                props.setCurrentUser(userCredential.user);
            })
            .catch((error) => {
                alert("Invalid Password or email!")
                setIsInvalidPassword(true);
                console.log(error);
            });
    }

    const handleResetPasswordClicked = () => {
        axios.post("/sendPasswordResetLink", { email: email }).then((response) => {
            console.log(response);
            alert("Password reset email sent successfully!");
            setPassword('');
        });
    }

    return (
        <div style={{ width: "450px", margin: "auto", marginTop: "80px" }}>
            <h2>User Login</h2>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" value={email} onChange={handleEmailChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={handlePasswordChange} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="btn btn-primary" onClick={handleSubmitClicked}>Submit</button>
                {isInvalidPassword && <button className="btn btn-secondary" onClick={handleResetPasswordClicked}>Reset Password</button>}
            </div>
        </div >
    )
}