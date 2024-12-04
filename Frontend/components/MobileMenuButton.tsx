'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function MobileMenuButton() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    const sidebar = document.getElementById('sidebar')
    sidebar?.classList.toggle('-translate-x-full')
  }

  return (
    <>
      <button 
        onClick={toggleMobileMenu}
        className="lg:hidden p-2 text-purple-400"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  )
}

