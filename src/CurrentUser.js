export const UserDetails = (props) => {
    return (
        <div style={{ width: "600px", margin: "auto", marginTop: "80px" }}>
            <h2 >Current User Details</h2>
            <p>Email: {props.user.email}</p>
        </div>
    )
}