import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Category from './pages/Category'
import Contact from './pages/Contact'
import AddProduct from './pages/AddProduct'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App