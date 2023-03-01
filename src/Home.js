import { useEffect, useState } from "react";
import { UserDetails } from "./CurrentUser";
import { UserLogin } from "./UserLogin"
import { UserRegister } from "./UserRegister"

export const Home = (props) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);

    const user = props.auth.currentUser;

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        } else {
            setIsLoginVisible(true);
        }
    }, [props.auth])

    useEffect(() => {
        console.log(user);
    })

    const handleLoginClicked = () => {
        setIsLoginVisible(true);
        setIsRegisterVisible(false);
    }

    const handleRegisterClicked = () => {
        setIsRegisterVisible(true);
        setIsLoginVisible(false);
    }

    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <p className="navbar-brand">Enlear</p>
                    {!currentUser && (
                        <div className="d-flex">
                            <button className="btn btn-success" onClick={handleLoginClicked}>Login</button>
                            <button className="btn btn-warning" style={{ marginLeft: "10px" }} onClick={handleRegisterClicked}>Signup</button>
                        </div>
                    )}
                    {currentUser && (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <p>{currentUser.email}</p>
                            <button className="btn btn-warning" style={{ marginLeft: "10px" }}>Logout</button>
                        </div>
                    )}
                </div>
            </nav>
            {!currentUser && isRegisterVisible && <UserRegister auth={props.auth} setCurrentUser={setCurrentUser} />}
            {!currentUser && isLoginVisible && <UserLogin auth={props.auth} setCurrentUser={setCurrentUser} />}
            {currentUser && <UserDetails user={user} />}
        </div>
    )
}