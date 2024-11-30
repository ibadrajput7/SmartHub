import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, BarChart2, HelpCircle, Info, Settings, Calendar, Menu, X, BrainCircuit} from 'lucide-react';

const Sider = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { icon: <Home className="w-5 h-5" />, text: 'Home', path: '/UserDashboard'},
        { icon: <FileText className="w-5 h-5" />, text: 'My Notes', path: '/MyNotes' },
        { icon: <BarChart2 className="w-5 h-5" />, text: 'Analytics', path: '/Analytics' },
        { icon: <HelpCircle className="w-5 h-5" />, text: 'How to use', path: '/How' },
        { icon: <Info className="w-5 h-5" />, text: 'About us', path: '/About' },
        { icon: <Calendar className="w-5 h-5" />, text: 'Future updates',},
        { icon: <Settings className="w-5 h-5" />, text: 'Settings', path: '/Setting' },
      ];

  return (
    <div className="main-h-screen bg-gray-900">
       
        {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-black z-50 h-16 flex items-center justify-between px-4 md:px-6 border-b border-purple-900">
       
        {/* Left side - Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block w-8 h-8">
            <BrainCircuit className="w-8 h-8 text-purple-500" />
          </div>
          <span className="font-semibold text-xl text-white">SMART HUB</span>
        </div>

        {/* Right side - Support button and Mobile menu */}
        <div className="flex items-center gap-4">
          {/* Support Button */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-purple-400" />
            </div>
            <button><span className="ml-2 text-purple-300">Support</span></button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-purple-400"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-900 z-40 w-64 
        transition-transform duration-300 ease-in-out border-r border-purple-900/50
        lg:translate-x-0 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <nav className="p-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 hover:bg-purple-900/20 transition-colors
              ${item.active ? 'bg-purple-900/30 text-purple-400' : 'text-gray-400 hover:text-purple-300'}`}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

    </div>
  )
}

export default Sider;
