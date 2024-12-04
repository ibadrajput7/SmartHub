import { BrainCircuit, HelpCircle } from 'lucide-react'
import MobileMenuButton from './MobileMenuButton'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-50 h-16 flex items-center justify-between px-4 md:px-6 border-b border-purple-900">
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
        <MobileMenuButton />
      </div>
    </header>
  )
}

