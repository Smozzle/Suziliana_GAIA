import { useState } from "react";

function DynamicList() {
    const [items, setItems] = useState([
        { id: 1, name: 'Jackfruit', category: 'Fruit' },
        { id: 2, name: 'Broccoli', category: 'Vegetable' },
        { id: 3, name: 'Carrot', category: 'Vegetable' },
    ]);
    const [newItem, setNewItem] = useState('');

    const handleListClick = (e) => {
        //Event delegation: Check if the clicked element is a list item
        const listItem = e.target.closest('li');
        if (listItem) return;

        const itemId = parseInt(listItem.dataset.id, 10);
        const action = e.target.dataset.action;

        if (action === 'delete') {
            setItems(prev => prev.filter(item => item.id !== itemId));
        } else if (action === 'edit') {
            const newName = prompt('Enter new name:');
            setItems(prev => prev.map(item =>
                item.id === itemId ? { ...item, name: newName } : item
            ));
        }
    }


    const addItem = () => {
        if (newItem.trim()) {
            setItems(prev => [...prev, { id: Date.now(), name: newItem, category: 'other' }]);
            setNewItem('');
        }
    };

    return (
        <div>
            <div>
                <input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new item"
                    onKeyDown={(e) => e.key === 'Enter' && addItem()}
                />
                <button onClick={addItem}>Add</button>
            </div>

            <ul onClick={handleListClick} style={{ listStyleType: 'none', padding: 0 }}>
                {items.map(item => (
                    <li key={item.id} data-id={item.id} style={{ margin: '5px 0', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <span>{item.name} ({item.category})</span>
                        <div>
                            <button data-action="edit">Edit</button>
                            <button data-action="delete" style={{ marginLeft: '5px' }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DynamicList;