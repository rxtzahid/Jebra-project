import { Link } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import DarkModeToggle from './DarkModeToggle';
import { useState, useEffect } from 'react';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300 transition">Jebra Com</Link>
        </h1>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/category" className="hover:text-gray-300 transition">Category</Link>
          <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
          <Link to="/add-product" className="hover:text-gray-300 transition">Add Product</Link>
          <Link to="/cart" className="hover:text-gray-300 transition flex items-center gap-1">
            <FaShoppingCart /> Cart
          </Link>
          
          {/* Authentication Buttons */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition text-sm"
            >
              Logout ({user.name})
            </button>
          ) : (
            <div className="flex gap-3">
              <Link 
                to="/login" 
                className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded transition text-sm"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded transition text-sm"
              >
                Register
              </Link>
            </div>
          )}
          
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;