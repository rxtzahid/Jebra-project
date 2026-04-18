import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaMoneyBillWave } from 'react-icons/fa'
import API from '../services/api'

function Payment() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [pin, setPin] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async (e) => {
    e.preventDefault()
    
    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }
    
    if (!mobileNumber) {
      alert('Please enter your mobile number')
      return
    }
    
    if (!pin) {
      alert('Please enter your PIN')
      return
    }
    
    setIsProcessing(true)
    
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || []
    
    if (cartItems.length === 0) {
      alert('Your cart is empty!')
      navigate('/')
      return
    }
    
    try {
      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem('user'))
      
      if (!user || !user.token) {
        alert('Please login first!')
        navigate('/login')
        return
      }
      
      // Calculate totals
      const itemsPrice = cartItems.reduce((total, item) => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace('$', ''))
        return total + (price * item.quantity)
      }, 0)
      
      const shippingPrice = 10
      const totalPrice = itemsPrice + shippingPrice
      
      // Prepare order items with product ID
      const orderItems = cartItems.map(item => ({
        product: item.id,
        name: item.name,
        price: typeof item.price === 'number' ? item.price : parseFloat(item.price.replace('$', '')),
        quantity: item.quantity,
        image: item.image
      }))
      
      // Create order in database (stock will be reduced automatically in backend)
      const orderData = {
        orderItems,
        shippingAddress: {
          street: 'Test Street',
          city: 'Dhaka',
          state: 'Dhaka',
          zipCode: '1200',
          country: 'Bangladesh',
          phone: mobileNumber
        },
        paymentMethod: paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
      }
      
      const { data: order } = await API.post('/orders', orderData)
      
      // Clear cart from localStorage
      localStorage.removeItem('cart')
      
      alert(`✅ Payment successful via ${paymentMethod}!\n\nOrder ID: ${order._id}\nYour order has been placed.\nStock has been updated automatically.`)
      
      navigate('/')
      
    } catch (error) {
      console.error('Payment error:', error)
      alert(`❌ Payment failed: ${error.response?.data?.message || error.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Payment Method</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <form onSubmit={handlePayment}>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3">Select Payment Method</label>
            
            <div className="space-y-3">
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'bkash' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <input
                  type="radio"
                  name="payment"
                  value="bkash"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3 w-5 h-5"
                />
                <span className="text-3xl mr-3">📱</span>
                <div>
                  <span className="font-bold text-lg block">bKash</span>
                  <span className="text-sm text-gray-500">Mobile Banking</span>
                </div>
              </label>
              
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'nagad' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <input
                  type="radio"
                  name="payment"
                  value="nagad"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3 w-5 h-5"
                />
                <FaMoneyBillWave className="text-purple-500 text-3xl mr-3" />
                <div>
                  <span className="font-bold text-lg block">Nagad</span>
                  <span className="text-sm text-gray-500">Mobile Banking</span>
                </div>
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Mobile Number</label>
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">PIN (4 digit)</label>
            <input
              type="password"
              maxLength="4"
              placeholder="****"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>📝 Note:</strong> After payment, your order will be saved in database and stock will be reduced automatically.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 rounded-lg transition font-bold text-lg ${
              isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Payment