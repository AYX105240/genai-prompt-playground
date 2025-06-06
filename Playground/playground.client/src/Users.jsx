import { useEffect, useState } from 'react';
import { getToken } from './auth/auth';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from './apiConfig';

function Users() {
    const [users, setUsers] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getToken();
                const res = await fetch(`${API_BASE_URL}/api/user`, {
                    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                });
                if (res.status === 401 || (!token && res.status === 403)) {
                    setError('Unauthorized. Please log in to view users.');
                    return;
                }
                if (!res.ok) throw new Error('Failed to fetch users');
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUsers();
    }, []);

    if (error) return <div><p>Error: {error}</p><p><Link to="/login">Go to Login</Link></p></div>;
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
