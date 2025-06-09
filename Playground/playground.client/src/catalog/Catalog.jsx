import { useEffect, useState } from 'react';
import { getToken } from '../auth/auth';
import { API_BASE_URL } from '../apiConfig';
import AddProduct from './AddProduct';

function Catalog() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/catalog`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            if (!res.ok) throw new Error('Failed to fetch catalog');
            setProducts(await res.json());
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    return (
        <div>
            <h2>Catalog</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <AddProduct onProductAdded={fetchProducts} />
            <ul className="list-group">
                {products.map(product => (
                    <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            <strong>{product.name}</strong> <span className="text-muted">({product.category})</span><br />
                            Price: ${product.price}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Catalog;
