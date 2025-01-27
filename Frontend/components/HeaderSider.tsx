'use client'

import { BrainCircuit, HelpCircle, Menu } from 'lucide-react'
import { useSidebar } from '@/contexts/SidebarContext'
import { useChatbot } from '@/contexts/ChatbotContext'
import { Chatbot } from '@/components/Chatbot'

export default function Header() {
  const { toggleSidebar } = useSidebar()
  const { toggleChat } = useChatbot()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black z-50 h-16 flex items-center justify-between px-4 md:px-6 border-b border-purple-900">
        <div className="flex items-center gap-2">
          <div className="hidden lg:block w-8 h-8">
            <BrainCircuit className="w-8 h-8 text-purple-500" />
          </div>
          <span className="font-semibold text-xl text-white">SMART HUB</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleChat}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-purple-400" />
            </div>
            <span className="ml-2 text-purple-300">Support</span>
          </button>

          <button className="lg:hidden" onClick={toggleSidebar}>
            <Menu className="w-6 h-6 text-purple-500" />
          </button>
        </div>
      </header>
      <Chatbot />
    </>
  )
}