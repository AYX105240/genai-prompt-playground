import { useEffect, useState } from 'react';
import { getToken } from '../auth/auth';
import { API_BASE_URL } from '../apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function WishList() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    const fetchWishList = async () => {
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/wishlist`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });

            if (!res.ok) throw new Error('Failed to fetch wishlist');
            setItems(await res.json());
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => { fetchWishList(); }, []);

    const removeItem = async (id) => {
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/wishlist/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            if (!res.ok) throw new Error('Failed to remove item');
            fetchWishList();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div>
            <h2>Wish List</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {items.length === 0 ? (
                <div className="empty-wishlist text-center mt-4">
                    <FontAwesomeIcon icon={faHeart} size="3x" className="text-muted mb-3" />
                    <p>Your wishlist is empty. Start exploring the <Link to="/catalog">catalog</Link> to add items!</p>
                </div>
            ) : (
                <ul className="list-group">
                    {items.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {item.name} (x{item.quantity})
                            <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default WishList;
