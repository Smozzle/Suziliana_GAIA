function UserCard({name = "Jennie", email = "jennie@blackpink.com", role = "CEO"}) {
    return(
        <div>
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{role}</p>
        </div>
    )
}

export default UserCard;