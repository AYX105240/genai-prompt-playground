import { useEffect, useState } from 'react';
import { getToken, getUser } from '../auth/auth';
import { API_BASE_URL } from '../apiConfig';
import AddProduct from './AddProduct';
import CatalogItem from './CatalogItem';
import EditProductModal from './EditProductModal';
import { useNavigate } from 'react-router-dom';

function Catalog() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [returnUrl, setReturnUrl] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/catalog`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            if (!res.ok) throw new Error('Failed to fetch catalog');
            const fetchedProducts = await res.json();

            // Fetch wishlist items
            const wishlistRes = await fetch(`${API_BASE_URL}/api/wishlist`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            const wishlistItems = wishlistRes.ok ? await wishlistRes.json() : [];

            // Mark products as wishlisted
            const updatedProducts = fetchedProducts.map(product => ({
                ...product,
                isWishlisted: wishlistItems.some(item => item.id === product.id)
            }));

            setProducts(updatedProducts);
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const beautifyProduct = (product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description || "No description available",
        imageUrl: product.imageUrl || "https://via.placeholder.com/150",
        category: product.category || "Uncategorized"
    });

    const isAdmin = getUser()?.role === 'Admin';

    const handleQuantityChange = (productId, value) => {
        setQuantity({ ...quantity, [productId]: parseInt(value, 10) || 1 });
    };

    const handleAddToCart = async (product) => {
        const user = getUser();
        if (!user) {
            setReturnUrl(window.location.pathname);
            setShowLoginPopup(true);
            return;
        }

        const cartItem = {
            name: product.name,
            quantity: quantity[product.id] || 1,
            price: product.price,
            productId: product.id.toString(),
            imageUrl: product.imageUrl,
            size: null,
            color: null,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(cartItem),
            });
            if (!response.ok) throw new Error('Failed to add product to cart');
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart.');
        }
    };

    const handleSaveEdit = (updatedProduct) => {
        fetch(`${API_BASE_URL}/api/catalog/${updatedProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(updatedProduct),
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to update product');
            alert('Product updated successfully!');
            fetchProducts();
            setEditModalOpen(false);
        })
        .catch(error => {
            console.error('Error updating product:', error);
            alert('Failed to update product.');
        });
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/catalog/${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete product');
            alert('Product deleted successfully!');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product.');
        }
    };

    const handleToggleWishlist = async (productId) => {
        const user = getUser();
        if (!user) {
            setReturnUrl(window.location.pathname);
            setShowLoginPopup(true);
            return;
        }

        try {
            const product = products.find(p => p.id === productId.id);
            const url = `${API_BASE_URL}/api/wishlist/${productId.id}`;
            const method = product.isWishlisted ? 'DELETE' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (!response.ok) throw new Error('Failed to update wishlist');

            alert(product.isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
            fetchProducts();
        } catch (error) {
            console.error('Error updating wishlist:', error);
            alert('Failed to update wishlist.');
        }
    };

    return (
        <div>
            <h2>Catalog</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {isAdmin && <AddProduct onProductAdded={fetchProducts} />}
            <div className="card-group" style={{ maxWidth: "100%", margin: "auto" }}>
                {products.map(product => (
                    <CatalogItem
                        key={product.id}
                        product={product}
                        isAdmin={isAdmin}
                        quantity={quantity}
                        onQuantityChange={handleQuantityChange}
                        onAddToCart={handleAddToCart}
                        onEditProduct={(product) => {
                            setEditProduct(product);
                            setEditModalOpen(true);
                        }}
                        onDeleteProduct={handleDeleteProduct}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={product.isWishlisted}
                    />
                ))}
            </div>
            <EditProductModal
                isOpen={editModalOpen}
                product={editProduct}
                onSave={handleSaveEdit}
                onClose={() => setEditModalOpen(false)}
            />
            {showLoginPopup && (
                <div className="login-popup" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px', zIndex: 1000 }}>
                    <p>You haven't logged in to add items to the cart.</p>
                    <button onClick={() => navigate(`/login?returnUrl=${returnUrl}`)}>Login</button>
                </div>
            )}
        </div>
    );
}

export default Catalog;
