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

    const updateQuantity = async (id, newQuantity) => {
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({ quantity: newQuantity })
            });
            if (!res.ok) throw new Error('Failed to update quantity');
            fetchCart();
        } catch (e) {
            setError(e.message);
        }
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div>
            <h2 className='text-lg-start'>Cart</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-group">
                {items.map(item => (
                    <li key={item.id} className="list-group-item">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                <span>{item.name}(x{item.quantity})</span>
                                <span className='m-2'>at ${item.price}</span>

                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', flex: '1', justifyContent: 'flex-end' }}>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                                    style={{ marginLeft: '10px', width: '60px', textAlign: 'right' }}
                                />
                                <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)} style={{ marginLeft: '10px' }}>Remove</button>
                                <span style={{ marginLeft: '10px' }}>Total: ${item.price * item.quantity}</span>

                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-3" style={{ textAlign: 'right' }}>
                <h4>Total Amount: ${calculateTotal()}</h4>
                <button className="btn btn-success" onClick={() => alert('Proceeding to payment...')}>Proceed to Pay</button>
            </div>
        </div>
    );
}

export default Cart;
