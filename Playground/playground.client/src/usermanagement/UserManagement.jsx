import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../auth/auth'; // Adjust the import path as necessary
import { API_BASE_URL } from '../apiConfig';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', role: 'user', password: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/user`, newUser, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            setUsers([...users, response.data]);
            setNewUser({ firstName: '', lastName: '', email: '', role: 'user', password: '' });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleEditUser = async (id, updatedUser) => {
        try {
            await axios.put(`${API_BASE_URL}/api/user/${id}`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            setUsers(users.map(user => user.id === id ? updatedUser : user));
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Management</h1>
            <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                <h2>Add User</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        <option value="Viewer">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button onClick={handleAddUser} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Add User</button>
                </div>
            </div>

            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                <h2>Users</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    {users.map(user => (
                        <div key={user.id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff' }}>
                            <span style={{ display: 'block', marginBottom: '10px' }}><strong>{user.name}</strong> ({user.role})</span>
                            <button onClick={() => handleEditUser(user.id, { ...user, name: 'Updated Name' })} style={{ marginRight: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.id)} style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
