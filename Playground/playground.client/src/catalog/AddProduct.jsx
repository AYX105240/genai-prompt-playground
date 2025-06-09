import { useState } from 'react';
import { getToken } from '../auth/auth';
import { API_BASE_URL } from '../apiConfig';

function AddProduct({ onProductAdded }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const handleAddProduct = async () => {
        setError('');
        try {
            const product = { name, price: parseFloat(price), description, imageUrl, category };
            const res = await fetch(`${API_BASE_URL}/api/catalog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify(product)
            });
            if (!res.ok) throw new Error('Failed to add product');
            onProductAdded(); // Refresh the catalog
            setName('');
            setPrice('');
            setDescription('');
            setImageUrl('');
            setCategory('');
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="add-product">
            <h3>Add Product</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                <button onClick={handleAddProduct}>Add Product</button>
            </div>
        </div>
    );
}

export default AddProduct;
