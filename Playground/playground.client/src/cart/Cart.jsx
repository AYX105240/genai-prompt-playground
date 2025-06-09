import { useEffect, useState } from 'react';
import { getToken } from '../auth/auth';
import { API_BASE_URL } from '../apiConfig';

function Cart() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');

    const fetchCart = async () => {
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            if (!res.ok) throw new Error('Failed to fetch cart');
            setItems(await res.json());
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => { fetchCart(); }, []);

    const addItem = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({ name, quantity: Number(quantity) })
            });
            if (!res.ok) throw new Error('Failed to add item');
            setName(''); setQuantity(1);
            fetchCart();
        } catch (e) {
            setError(e.message);
        }
    };

    const removeItem = async (id) => {
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            if (!res.ok) throw new Error('Failed to remove item');
            fetchCart();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div>
            <h2>Cart</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={addItem} className="mb-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Item name" required />
                <input type="number" value={quantity} min={1} onChange={e => setQuantity(e.target.value)} style={{ width: 60, marginLeft: 8 }} required />
                <button className="btn btn-primary btn-sm ms-2" type="submit">Add</button>
            </form>
            <ul className="list-group">
                {items.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {item.name} (x{item.quantity})
                        <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;
