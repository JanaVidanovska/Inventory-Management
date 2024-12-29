import { useState, useEffect } from 'react'
import axios from 'axios'

enum ItemType {
  CommunicationEquipment = "Communication Equipment",
  ComputerEquipment = "Computer Equipment",
  Furniture = "Furniture",
  Machinery = "Machinery",
}

enum ItemState {
  Broken = "Broken",
  Deprecated = "Deprecated",
  InUser = "In User",
  Lost = "Lost",
}

interface InventoryItem {
  id: string;
  type: ItemType;
  description: string;
  added_at: string;
  state: ItemState;
  updated_at: string;
}

function App() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setItems(response.data.inventory_items);
    } catch (error) {
      console.error("Failed to fetch items", error);
    }
  };

  const addItem = async () => {
    try {
        const response = await axios.post('/api/inventory', 
          {
            type: ItemType.CommunicationEquipment,
            description: '',
            state: ItemState.Broken
          },
        ); 
        setItems(prevItems => [...prevItems, response.data]);
    } catch (error) {
      console.error("Failed to add item");
    }
  };

  const deleteItem = async (idToRemove: string) => {
    try {
      await axios.delete(`/api/inventory/${idToRemove}`);
      setItems(items.filter(item => item.id !== idToRemove));
    } catch (error) {
      console.error("Failed to delete item");
    }
  };

  const updateItem = async (updatedItem: InventoryItem) => {
    try {
      const response = await axios.put(`/api/inventory/${updatedItem.id}`,
        {
          type: updatedItem.type,
          description: updatedItem.description,
          state: updatedItem.state
        },
      );
      setItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? response.data : item));
    } catch (error) {
      console.error("Failed to update item");
    }
  }

  const renderItemRow = (item: InventoryItem) => {
    return (
      <tr key={item.id}>
        <td className="cell">{item.id}</td>
        <td className="cell">
          <select
            className = "select"
            value={item.type}
            onChange={(e) =>
              updateItem({ ...item, type: e.target.value as ItemType })
            }
          >
            {Object.values(ItemType).map((type) => (
              <option className="option" key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </td>
        <td className="cell">
          <input
            className="description"
            type="text"
            value={item.description}
            onChange={(e) =>
              updateItem({ ...item, description: e.target.value })
            }
            placeholder="Item description"
          />
        </td>
        <td className="cell">
          <select
            className = "select"
            value={item.state}
            onChange={(e) =>
                updateItem({ ...item, state: e.target.value as ItemState })
            }
          >
            {Object.values(ItemState).map((state) => (
              <option className="option" key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </td>
        <td className="cell">{item.added_at}</td>
        <td className="cell">{item.updated_at}</td>
        <td className="cell">
          <button className="button delete-button" onClick={() => (deleteItem(item.id))}>
            Delete
          </button>
        </td>
      </tr>
    );
  };
   
  useEffect(() => {
    fetchItems();
  }, []);


  return (
    <>
      <h1 className='header'>Inventory Management</h1>
      <div className="container">
        <button className="button add-button" onClick={addItem}>+ Add New Item</button>
      </div>
      <br/>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Description</th>
            <th>State</th>
            <th>Added At</th>
            <th>Last Updated At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => renderItemRow(item))}
          
        </tbody>
      </table>
    </>
  );
}
export default App;