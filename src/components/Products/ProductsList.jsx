import { useState, useEffect, useContext } from "react";
import { CartContext } from '../Context/MainContext';
import { useNavigate } from 'react-router-dom'; 

function ProductList() {
  // Hook for programmatic navigation
  const navigate = useNavigate();  
  
  // Access cart context for global state management
  const { cart, setCart } = useContext(CartContext);

  // Function to add a product to the cart
  const PushToArray = (obj) => {
    setCart((prevCart) => [...prevCart, obj]); // Update cart immutably
  };

  // State management
  const [products, setProducts] = useState([]); // Store fetched products
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);     // Store potential errors
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [productsPerPage] = useState(6);            // Number of products per page

  // Effect hook to fetch products when component mounts
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products); // Store fetched products in state
        setLoading(false);          // Turn off loading state
      })
      .catch((err) => {
        setError(err.message);      // Store any error message
        setLoading(false);          // Turn off loading state
      });
  }, []); // Empty dependency array means this effect runs once on mount

  // Show loading state while fetching products
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Show error message if fetch failed
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="p-4">
      {/* Cart navigation button */}
      <div className="flex justify-end">
        <button 
          onClick={() => navigate("/CartItems")} 
          className="bg-blue-600 text-white p-2 rounded mb-4"
        >
          Cart Has {cart.length} Items
        </button>
      </div>

      <h1 className="text-2xl mb-4">Products</h1>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow-md flex flex-col"
          >
            {/* Product image */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover mb-4"
            />
            {/* Product details */}
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-500">Price: ${product.price}</p>
            <p className="text-sm flex-grow">{product.description}</p>
            {/* Add to cart button */}
            <button
              onClick={() => PushToArray(product)}
              className="mt-2 bg-green-600 text-white p-2 rounded"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination mt-6 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`py-2 px-4 mx-1 rounded transition duration-300 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"  // Active page button style
                : "bg-gray-200 text-black"  // Inactive page button style
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductList;