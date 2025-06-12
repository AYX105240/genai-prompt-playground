import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EditProductModal({ isOpen, product, onSave, onClose }) {
    const [editProduct, setEditProduct] = React.useState(product);

    React.useEffect(() => {
        setEditProduct(product);
    }, [product]);

    const handleSave = () => {
        onSave(editProduct);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit Product"
        >
            <h2>Edit Product</h2>
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        value={editProduct?.name || ''}
                        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        value={editProduct?.price || ''}
                        onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={editProduct?.description || ''}
                        onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                    />
                </label>
                <label>
                    Category:
                    <input
                        type="text"
                        value={editProduct?.category || ''}
                        onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        value={editProduct?.imageUrl || ''}
                        onChange={(e) => setEditProduct({ ...editProduct, imageUrl: e.target.value })}
                    />
                </label>
                <button type="button" onClick={handleSave}>Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
}

export default EditProductModal;
