function Contact() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-center my-8">Contact Us</h1>
      
      <form className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea rows="5" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"></textarea>
        </div>
        
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full">
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact