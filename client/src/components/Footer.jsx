import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
            <h3 className="text-xl font-bold mb-4">Jebra Com</h3>
            <p className="text-gray-400 text-sm">
              Your one-stop destination for all your shopping needs. Quality products at best prices.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/category" className="text-gray-400 hover:text-white transition">Category</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><Link to="/add-product" className="text-gray-400 hover:text-white transition">Add Product</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Electronics</li>
              <li className="text-gray-400">Clothing</li>
              <li className="text-gray-400">Books</li>
              <li className="text-gray-400">Home & Living</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +880 1234 567890</li>
              <li>✉️ info@jebracom.com</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
              <FaGithub />
            </a>
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            &copy; 2026 Jebra Com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer