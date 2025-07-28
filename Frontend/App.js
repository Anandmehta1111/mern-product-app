import { useEffect, useState } from 'react'; 
import axios from 'axios'; 
function App() { 
const [products, setProducts] = useState([]); 
const [form, setForm] = useState({ 
name: '', 
price: '', 
description: '' 
}); 
  const fetchProducts = async () => { 
    const res = await axios.get('http://localhost:4000/api/products'); 
    setProducts(res.data); 
  }; 
 
  useEffect(() => { 
    fetchProducts(); 
  }, []); 
 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    await axios.post('http://localhost:4000/api/products', form); 
    setForm({ name: '', price: '', description: '' }); 
    fetchProducts(); 
  }; 
 
  return ( 
    <div style={{ padding: '20px' }}> 
      <h2>Add Product</h2> 
      <form onSubmit={handleSubmit}> 
        <input 
          placeholder="Name" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
        /><br /><br /> 
        <input 
          placeholder="Price" 
          type="number" 
          value={form.price} 
          onChange={(e) => setForm({ ...form, price: e.target.value })} 
        /><br /><br /> 
        <textarea 
          placeholder="Description" 
          value={form.description} 
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
        /><br /><br /> 
        <button type="submit">Add</button> 
      </form> 
 
      <h3>Products:</h3> 
      <ul> 
        {products.map((p) => ( 
          <li key={p._id}>{p.name} - ₹{p.price} <br /> {p.description}</li> 
        ))} 
      </ul> 
    </div> 
  ); 
} 
 
export default App; 
