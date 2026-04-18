import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaImage, FaDollarSign, FaStar, FaTag, FaArrowLeft, FaBoxes } from 'react-icons/fa'
import API from '../services/api'

function AddProduct() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    rating: '',
    category: 'phone',
    image: '',
    description: '',
    stock: ''
  })
  
  const [imagePreview, setImagePreview] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: 'phone', label: '📱 Phone', color: 'blue' },
    { value: 'laptop', label: '💻 Laptop', color: 'green' },
    { value: 'watch', label: '⌚ Watch', color: 'purple' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleImageChange = (e) => {
    const url = e.target.value
    setFormData({
      ...formData,
      image: url
    })
    setImagePreview(url)
    
    if (errors.image) {
      setErrors({
        ...errors,
        image: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters'
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required'
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Please enter a valid price'
    }
    
    if (!formData.rating) {
      newErrors.rating = 'Rating is required'
    } else if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5'
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required'
    }
    
    if (!formData.stock && formData.stock !== 0) {
      newErrors.stock = 'Stock quantity is required'
    } else if (isNaN(formData.stock) || formData.stock < 0) {
      newErrors.stock = 'Please enter a valid stock quantity'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Get user from localStorage for token
      const user = JSON.parse(localStorage.getItem('user'))
      
      if (!user || !user.token) {
        alert('❌ Please login first!')
        navigate('/login')
        return
      }
      
      // Send to backend API
      const { data } = await API.post('/products', {
        name: formData.name,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        image: formData.image,
        category: formData.category,
        stock: parseInt(formData.stock),
        description: formData.description,
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      
      alert(`✅ "${formData.name}" has been added successfully!`)
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        rating: '',
        category: 'phone',
        image: '',
        description: '',
        stock: ''
      })
      setImagePreview('')
      
      // Redirect to home
      setTimeout(() => {
        navigate('/')
      }, 1000)
      
    } catch (error) {
      console.error('Error adding product:', error)
      const errorMessage = error.response?.data?.message || 'Error adding product. Make sure you are logged in as admin.'
      alert(`❌ ${errorMessage}`)
      
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        navigate('/login')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <button
        onClick={() => navigate('/')}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition"
      >
        <FaArrowLeft /> Back to Home
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Add New Product</h1>
          <p className="text-white text-center opacity-90 mt-2">Fill the details to add a new product</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              <FaTag className="inline mr-2" />
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                <FaDollarSign className="inline mr-2" />
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                step="0.01"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                  errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                <FaStar className="inline mr-2 text-yellow-500" />
                Rating <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Rating (0-5)"
                step="0.1"
                min="0"
                max="5"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                  errors.rating ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                <FaBoxes className="inline mr-2" />
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock quantity"
                min="0"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                  errors.stock ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Category <span className="text-red-500">*</span></label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              <FaImage className="inline mr-2" />
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleImageChange}
              placeholder="Image URL"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600" />
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description"
              rows="4"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 py-3 rounded-lg transition font-bold text-lg ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isSubmitting ? 'Adding...' : '✅ Add Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-bold text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct