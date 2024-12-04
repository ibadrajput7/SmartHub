import { Home, FileText, BarChart2, HelpCircle, Info, Settings, Calendar } from 'lucide-react'
import Link from 'next/link'

const menuItems = [
  { icon: <Home className="w-5 h-5" />, text: 'Home', path: '/page'},
  { icon: <FileText className="w-5 h-5" />, text: 'My Notes', path: '/MyNotes' },
  { icon: <BarChart2 className="w-5 h-5" />, text: 'Analytics', path: '/Analytics' },
  { icon: <HelpCircle className="w-5 h-5" />, text: 'How to use', path: '/How' },
  { icon: <Info className="w-5 h-5" />, text: 'About us', path: '/About' },
  { icon: <Calendar className="w-5 h-5" />, text: 'Future updates', path: '/Updates'},
  { icon: <Settings className="w-5 h-5" />, text: 'Settings', path: '/Setting' },
];

export default function Sidebar() {
  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-900 z-40 w-64 
                    transition-transform duration-300 ease-in-out border-r border-purple-900/50
                    lg:translate-x-0 -translate-x-full lg:translate-x-0"
         id="sidebar">
      <nav className="p-4">
        {menuItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 hover:bg-purple-900/20 transition-colors text-gray-400 hover:text-purple-300">
              {item.icon}
              <span>{item.text}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}

