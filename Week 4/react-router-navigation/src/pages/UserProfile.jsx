import { useParams } from "react-router-dom";

const users = {
    1: { name: "Usin", age: 42, status: "Married"},
    2: { name: "Balqis", age: 22, status: "Taken"},
    3: { name: "Sebas", age: 24, status: "Single"}
};

function UserProfile() {
    const { id } =useParams ();
    const user = users[id];
    
    if (!user) return <p> User not found </p>

    return (
        <>
        <h2> User Profile</h2>
        <p> Name: {user.name}</p>
        <p> Age: {user.age}</p>
        <p> Status: {user.status}</p>
        </>
    );
}

export default UserProfile;