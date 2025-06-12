import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/cart')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Authorization failed');
                }
                return response.json();
            })
            .catch(err => setError(err.message));
    }, []);

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <Link to="/login">Click here to login</Link>
            </div>
        );
    }

    return (
        <div>
            {/* ...existing code for displaying cart items... */}
        </div>
    );
}

export default Cart;