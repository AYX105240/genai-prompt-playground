import { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState();
    useEffect(() => {
        fetch('http://localhost:7000/api/user')
            .then(res => res.json())
            .then(setUsers);
    }, []);
    if (!users) return <p>Loading users...</p>;
    return (
        <table className="table table-striped" aria-labelledby="userTableLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Users;
