import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart, faHeart as unfilledHeart } from '@fortawesome/free-solid-svg-icons';

function CatalogItem({ product, isAdmin, quantity, onQuantityChange, onAddToCart, onEditProduct, onDeleteProduct, onToggleWishlist, isWishlisted }) {
    const beautifyProduct = (product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description || "No description available",
        imageUrl: product.imageUrl || "https://via.placeholder.com/150",
        category: product.category || "Uncategorized"
    });

    const beautifiedProduct = beautifyProduct(product);

    return (
        <div className="card" style={{ margin: "10px", maxWidth: "300px" }}>
            <img src={beautifiedProduct.imageUrl} className="card-img-top" alt={beautifiedProduct.name} style={{ maxWidth: "100%" }} />
            <div className="card-body">
                <h5 className="card-title">
                    {beautifiedProduct.name}
                    <FontAwesomeIcon
                        icon={isWishlisted ? filledHeart : unfilledHeart}
                        style={{ marginLeft: '10px', cursor: 'pointer', color: isWishlisted ? 'red' : 'gray' }}
                        onClick={() => onToggleWishlist({ id: beautifiedProduct.id })}
                    />
                </h5>
                <p className="card-text">{beautifiedProduct.description}</p>
                <p className="card-text"><small className="text-muted">Category: {beautifiedProduct.category}</small></p>
                <p className="card-text">Price: ${beautifiedProduct.price}</p>
                {!isAdmin && (
                    <>
                        <input
                            type="number"
                            min="1"
                            value={quantity[beautifiedProduct.id] || 1}
                            onChange={(e) => onQuantityChange(beautifiedProduct.id, e.target.value)}
                            style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                            placeholder="Quantity"
                        />
                        <button
                            onClick={() => onAddToCart(beautifiedProduct)}
                            style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
                        >
                            Add to Cart
                        </button>
                    </>
                )}
                {isAdmin && (
                    <>
                        <button
                            onClick={() => onEditProduct(beautifiedProduct)}
                            style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#ffc107', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDeleteProduct(beautifiedProduct.id)}
                            style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default CatalogItem;
