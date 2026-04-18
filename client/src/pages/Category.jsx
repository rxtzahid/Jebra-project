import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaStar } from 'react-icons/fa'

function Category() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [products, setProducts] = useState([])

  const defaultProducts = [
    {
      id: 1, name: "iPhone 15 Pro", price: "$999", rating: 4.8,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
      category: "phone", stock: 10
    },
    {
      id: 2, name: "Samsung Galaxy S24", price: "$899", rating: 4.7,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
      category: "phone", stock: 8
    },
    {
      id: 3, name: "Google Pixel 8", price: "$799", rating: 4.6,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
      category: "phone", stock: 5
    },
    {
      id: 4, name: "MacBook Pro M3", price: "$1499", rating: 4.9,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      category: "laptop", stock: 7
    },
    {
      id: 5, name: "Dell XPS 15", price: "$1299", rating: 4.7,
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400",
      category: "laptop", stock: 6
    },
    {
      id: 6, name: "HP Spectre x360", price: "$1199", rating: 4.6,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
      category: "laptop", stock: 4
    },
    {
      id: 7, name: "Apple Watch Series 9", price: "$399", rating: 4.8,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
      category: "watch", stock: 15
    },
    {
      id: 8, name: "Samsung Galaxy Watch 6", price: "$299", rating: 4.5,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
      category: "watch", stock: 12
    },
    {
      id: 9, name: "Garmin Fenix 7", price: "$699", rating: 4.7,
      image: "https://images.unsplash.com/photo-1617043786394-f13fa4b2a40e?w=400",
      category: "watch", stock: 3
    }
  ]

  useEffect(() => {
    let storedProducts = JSON.parse(localStorage.getItem('products')) || []
    
    // Fix old products that don't have stock field
    if (storedProducts.length > 0) {
      let needsUpdate = false
      storedProducts = storedProducts.map(product => {
        if (product.stock === undefined) {
          needsUpdate = true
          return { ...product, stock: 10 }
        }
        return product
      })
      if (needsUpdate) {
        localStorage.setItem('products', JSON.stringify(storedProducts))
      }
    }
    
    if (storedProducts.length === 0) {
      localStorage.setItem('products', JSON.stringify(defaultProducts))
      setProducts(defaultProducts)
    } else {
      setProducts(storedProducts)
    }
  }, [])

  const getCategoryCount = (categoryKey) => {
    return products.filter(p => p.category === categoryKey).length
  }

  const categories = [
    { id: 1, name: "Phones", key: "phone", icon: "📱", color: "bg-blue-500", count: getCategoryCount("phone") },
    { id: 2, name: "Laptops", key: "laptop", icon: "💻", color: "bg-green-500", count: getCategoryCount("laptop") },
    { id: 3, name: "Watches", key: "watch", icon: "⌚", color: "bg-purple-500", count: getCategoryCount("watch") }
  ]

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : []

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      alert(`❌ ${product.name} is out of stock!`)
      return
    }
    
    const existingCart = JSON.parse(localStorage.getItem('cart')) || []
    const existingProduct = existingCart.find(item => item.id === product.id)
    const currentQuantity = existingProduct ? existingProduct.quantity : 0
    
    if (currentQuantity + 1 > product.stock) {
      alert(`❌ Only ${product.stock} items available!`)
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

  if (!selectedCategory) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">Shop by Category</h1>
        <p className="text-center text-gray-600 mb-12">Choose a category to browse products</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.key)}
              className="cursor-pointer bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-transform hover:scale-105"
            >
              <div className={`${category.color} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl`}>
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-4">{category.count} Products</p>
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
                Browse {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const selectedCategoryInfo = categories.find(c => c.key === selectedCategory)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-6 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2"
      >
        ← Back to Categories
      </button>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {selectedCategoryInfo?.icon} {selectedCategoryInfo?.name}
        </h1>
        <p className="text-gray-600">Showing {filteredProducts.length} products</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
          <button
            onClick={() => navigate('/add-product')}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            + Add New Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform hover:scale-105">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover"
                onError={(e) => e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}
              />
              
              <div className="p-4">
                <div className="mb-2 flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.category === 'phone' ? 'bg-blue-100 text-blue-600' :
                    product.category === 'laptop' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {product.category === 'phone' ? '📱 Phone' :
                     product.category === 'laptop' ? '💻 Laptop' : '⌚ Watch'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {product.stock > 0 ? `✅ Stock: ${product.stock}` : '❌ Out of Stock'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">({product.rating})</span>
                </div>
                
                <p className="text-2xl font-bold text-green-600 mb-4">{product.price}</p>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full py-3 rounded-lg transition flex items-center justify-center gap-2 ${
                    product.stock > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
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

export default Category