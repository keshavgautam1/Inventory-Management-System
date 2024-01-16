import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [supplierInfo, setSupplierInfo] = useState('');
    const [mfgDate, setMfgDate] = useState('');
    const [editItemId, setEditItemId] = useState(null);
    const [items, setItems] = useState([]);

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const itemObject = {
            name,
            price,
            supplierInfo,
            mfgDate,
        };

        try {
            if (editItemId) {
                const updateResponse = await fetch(`http://localhost:4000/api/v1/item/update/${editItemId}`, {
                    method: 'PUT',
                    body: JSON.stringify(itemObject),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (updateResponse.status === 200) {
                    const updatedItem = await updateResponse.json();
                    setItems((prevItems) =>
                        prevItems.map((item) => (item._id === editItemId ? updatedItem.data : item))
                    );
                    resetForm();
                } else {
                    console.error('Error updating item:', updateResponse.status);
                }
            } else {
                const addResponse = await fetch('http://localhost:4000/api/v1/item/add', {
                    method: 'POST',
                    body: JSON.stringify(itemObject),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (addResponse.status === 200) {
                    const newItem = await addResponse.json();
                    setItems((prevItems) => [newItem.data, ...prevItems]);
                    resetForm();
                } else {
                    console.error('Error adding item:', addResponse.status);
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/item/delete/${itemId}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
                setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
            } else {
                console.error('Error deleting item:', response.status);
            }
        } catch (error) {
            console.error('Error deleting item:', error.message);
        }
    };

    const handleEdit = (itemId) => {
        setEditItemId(itemId);
        fetchItemDetails(itemId);
    };

    const fetchItemDetails = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/item/get/${itemId}`);
            if (response.status === 200) {
                const itemDetails = await response.json();
                setName(itemDetails.data.name);
                setPrice(itemDetails.data.price);
                setSupplierInfo(itemDetails.data.supplierInfo);
                setMfgDate(itemDetails.data.mfgDate);
            } else {
                console.error('Error fetching item details for editing:', response.status);
            }
        } catch (error) {
            console.error('Error fetching item details for editing:', error.message);
        }
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setSupplierInfo('');
        setMfgDate('');
        setEditItemId(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/item/get');
                if (response.status === 200) {
                    const data = await response.json();
                    setItems(data.data);
                } else {
                    console.error('Error fetching items:', response.status);
                }
            } catch (error) {
                console.error('Error fetching items:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>{editItemId ? 'Edit' : 'Add'} Inventory Item</h1>
            <form onSubmit={formSubmitHandler}>
                <div>
                    <label htmlFor="name">Name:- </label>
                    <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="price">Price:- </label>
                    <input id="price" value={price} onChange={(event) => setPrice(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="supplierInfo">Supplier Info:- </label>
                    <input id="supplierInfo" value={supplierInfo} onChange={(event) => setSupplierInfo(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="mfgDate">Mfg Date:- </label>
                    <input id="mfgDate" type="date" value={mfgDate} onChange={(event) => setMfgDate(event.target.value)} />
                </div>
                <div>
                    <button type="submit">{editItemId ? 'Update' : 'Submit'}</button>
                    <button type="reset" onClick={resetForm}>
                        Reset
                    </button>
                </div>
            </form>
            <div>
                <h1>Items List:-</h1>
                <ul>
                    {items.map((item) => (
                        <li key={item._id}>
                            {item.name}
                            <button onClick={() => handleEdit(item._id)}>Edit</button>
                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
