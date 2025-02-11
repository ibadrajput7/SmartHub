'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ChatbotContextType {
  isOpen: boolean
  toggleChat: () => void
  closeChat: () => void
}

const ChatbotContext = createContext<ChatbotContextType>({
  isOpen: false,
  toggleChat: () => {},
  closeChat: () => {}
})

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const value = {
    isOpen,
    toggleChat: () => setIsOpen(prev => !prev),
    closeChat: () => setIsOpen(false)
  }

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  )
}

export const useChatbot = () => useContext(ChatbotContext)