import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await API.post('/auth/login', formData);
      localStorage.setItem('user', JSON.stringify(data));
      alert('✅ Login successful!');
      navigate('/');
      window.location.reload(); // Navbar update করার জন্য
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Login</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;