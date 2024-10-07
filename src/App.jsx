import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products/ProductsList';
import CartItems from './components/Products/CartItems';
import Signup from './components/Authentication/Signup';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/CartItems" element={<CartItems />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
