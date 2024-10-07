import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Context/MainContext';
import { useNavigate } from 'react-router-dom'; 

function CartItems() {
  const navigate = useNavigate();  
  const { cart } = useContext(CartContext);
  
  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation (like fetching cart items)
    const loadCartItems = () => {
      setTimeout(() => {
        setLoading(false); // Set loading to false after simulating the load
      }, 1000); // Simulate a 1 second loading time
    };

    loadCartItems();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <button 
          onClick={() => navigate('/Products')} 
          className="bg-blue-600 text-white p-2 rounded"
        >
          Go to Products
        </button>
      </div>

      <h1 className="text-2xl mb-4">Cart Items</h1>

      {/* Show loading state */}
      {loading ? (
        <p>Loading cart items...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cart.map((product, index) => (
            <div 
              key={index} 
              className="border p-4 rounded shadow-md"
            >
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="w-full h-40 object-cover mb-4" 
              />
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-500">Price: ${product.price}</p>
              <p className="text-sm">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartItems;
