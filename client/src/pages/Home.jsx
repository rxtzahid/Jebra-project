import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaStar } from 'react-icons/fa'
import API from '../services/api'

function Home() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Load products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { data } = await API.get('/products')
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
        // If API fails, load from localStorage as fallback
        let storedProducts = JSON.parse(localStorage.getItem('products')) || []
        if (storedProducts.length === 0) {
          // Default products if nothing exists
          storedProducts = [
            {
              id: 1,
              name: "iPhone 15 Pro",
              price: 999,
              rating: 4.8,
              image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
              category: "phone",
              stock: 10
            },
            {
              id: 2,
              name: "Samsung Galaxy S24",
              price: 899,
              rating: 4.7,
              image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
              category: "phone",
              stock: 8
            },
            {
              id: 3,
              name: "Google Pixel 8",
              price: 799,
              rating: 4.6,
              image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
              category: "phone",
              stock: 5
            },
            {
              id: 4,
              name: "MacBook Pro M3",
              price: 1499,
              rating: 4.9,
              image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
              category: "laptop",
              stock: 7
            },
            {
              id: 5,
              name: "Dell XPS 15",
              price: 1299,
              rating: 4.7,
              image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400",
              category: "laptop",
              stock: 6
            },
            {
              id: 6,
              name: "HP Spectre x360",
              price: 1199,
              rating: 4.6,
              image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
              category: "laptop",
              stock: 4
            },
            {
              id: 7,
              name: "Apple Watch Series 9",
              price: 399,
              rating: 4.8,
              image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
              category: "watch",
              stock: 15
            },
            {
              id: 8,
              name: "Samsung Galaxy Watch 6",
              price: 299,
              rating: 4.5,
              image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
              category: "watch",
              stock: 12
            },
            {
              id: 9,
              name: "Garmin Fenix 7",
              price: 699,
              rating: 4.7,
              image: "https://images.unsplash.com/photo-1617043786394-f13fa4b2a40e?w=400",
              category: "watch",
              stock: 3
            }
          ]
        }
        setProducts(storedProducts)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory)

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      alert(`❌ ${product.name} is out of stock!`)
      return
    }
    
    const existingCart = JSON.parse(localStorage.getItem('cart')) || []
    const existingProduct = existingCart.find(item => item.id === product.id)
    
    const currentQuantity = existingProduct ? existingProduct.quantity : 0
    if (currentQuantity + 1 > product.stock) {
      alert(`❌ Only ${product.stock} items available in stock!`)
      return
    }
    
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1
    } else {
      existingCart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart))
    alert(`✅ ${product.name} added to cart!`)
  }

  const phoneCount = products.filter(p => p.category === 'phone').length
  const laptopCount = products.filter(p => p.category === 'laptop').length
  const watchCount = products.filter(p => p.category === 'watch').length

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">Welcome to Jebra Com</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Discover the best phones, laptops, and watches</p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-6 py-2 rounded-lg transition font-semibold ${
            activeCategory === 'all' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Products ({products.length})
        </button>
        
        <button
          onClick={() => setActiveCategory('phone')}
          className={`px-6 py-2 rounded-lg transition font-semibold ${
            activeCategory === 'phone' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          📱 Phones ({phoneCount})
        </button>
        
        <button
          onClick={() => setActiveCategory('laptop')}
          className={`px-6 py-2 rounded-lg transition font-semibold ${
            activeCategory === 'laptop' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          💻 Laptops ({laptopCount})
        </button>
        
        <button
          onClick={() => setActiveCategory('watch')}
          className={`px-6 py-2 rounded-lg transition font-semibold ${
            activeCategory === 'watch' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          ⌚ Watches ({watchCount})
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          {activeCategory === 'all' && 'All Products'}
          {activeCategory === 'phone' && '📱 Smartphones'}
          {activeCategory === 'laptop' && '💻 Laptops'}
          {activeCategory === 'watch' && '⌚ Smart Watches'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Showing {filteredProducts.length} products</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform hover:scale-105">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image"
                }}
              />
              
              <div className="p-4">
                <div className="mb-2 flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.category === 'phone' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' :
                    product.category === 'laptop' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' :
                    'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                  }`}>
                    {product.category === 'phone' ? '📱 Phone' :
                     product.category === 'laptop' ? '💻 Laptop' :
                     '⌚ Watch'}
                  </span>
                  
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 0 
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' 
                      : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
                  }`}>
                    {product.stock > 0 ? `✅ Stock: ${product.stock}` : '❌ Out of Stock'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{product.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">({product.rating})</span>
                </div>
                
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </p>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full py-3 rounded-lg transition flex items-center justify-center gap-2 ${
                    product.stock > 0 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  } text-white`}
                >
                  <FaShoppingCart />
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home