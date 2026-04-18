import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'

function Cart() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    setCartItems(cart)
  }, [])

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return total + (price * item.quantity)
    }, 0)
  }

  const handleCheckout = () => {
    const allProducts = JSON.parse(localStorage.getItem('products')) || []
    let hasStockIssue = false
    let outOfStockItems = []
    
    for (const item of cartItems) {
      const product = allProducts.find(p => p.id === item.id)
      if (!product || product.stock < item.quantity) {
        hasStockIssue = true
        outOfStockItems.push(`${item.name}: Available ${product?.stock || 0}, Requested ${item.quantity}`)
      }
    }
    
    if (hasStockIssue) {
      alert(`❌ Stock issue detected!\n\n${outOfStockItems.join('\n')}\n\nPlease update your cart.`)
    } else {
      navigate('/payment')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some products to your cart!</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map((item) => {
            const allProducts = JSON.parse(localStorage.getItem('products')) || []
            const product = allProducts.find(p => p.id === item.id)
            const isStockLow = product && item.quantity >= product.stock
            
            return (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row gap-4">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded" />
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-green-600 font-bold text-lg mb-2">{item.price}</p>
                  
                  {isStockLow && (
                    <p className="text-red-500 text-sm mb-2">
                      ⚠️ Only {product.stock} items left in stock!
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-lg font-semibold w-12 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={product && item.quantity >= product.stock}
                        className={`p-2 rounded ${
                          product && item.quantity >= product.stock 
                            ? 'bg-gray-100 cursor-not-allowed' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold">
                    ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="bg-gray-50 rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between mb-4 font-bold text-lg border-t pt-4">
              <span>Total:</span>
              <span>${(getTotalPrice() + 10).toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart