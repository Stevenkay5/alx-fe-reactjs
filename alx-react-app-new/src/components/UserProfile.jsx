const UserProfile = (props) => {
    return (
        <div style={{ border: '2px solid gray', padding: '50px', margin: '20px' }}>
            <h2 style={{color: 'navy', fontWeight: 'bold', fontSize: '50px'}}>{props.name}</h2>
            <p>Age: <span style={{ fontWeight: 'bold', fontSize: '60px', color:'blue' }}></span>{props.age}</p>
            <p>Bio: <span style={{ fontWeight: 'bold', color: 'blue' }}></span>{props.bio}</p>
        </div>
    );
};

export default UserProfile;