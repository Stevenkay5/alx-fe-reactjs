const UserProfile = (props) => {
    return (
        <div style={{backgroundColor: 'white', border: '1px solid gray', padding: '10px', margin: '10px' }}>
            <h2 style={{color: 'blue', fontWeight: 'bold', fontSize: '40px'}}>{props.name}</h2>
            <p>Age: <span style={{ fontWeight: 'bold', fontSize: '30px', color:'blue' }}>{props.age}</span></p>
            <p>Bio: <span style={{ fontWeight: 'bold', color: 'blue' }}>{props.bio}</span></p>
        </div>
    );
};

export default UserProfile;