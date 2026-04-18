import { useState, useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check local storage for dark mode preference
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else if (savedMode === 'false') {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    } else {
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true)
        document.documentElement.classList.add('dark')
      }
    }
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
      setDarkMode(true)
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <FaSun className="text-yellow-500 text-xl" />
      ) : (
        <FaMoon className="text-gray-700 text-xl" />
      )}
    </button>
  )
}

export default DarkModeToggle