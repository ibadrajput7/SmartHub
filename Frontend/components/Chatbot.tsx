'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Send } from 'lucide-react'
import { useChatbot } from '@/contexts/ChatbotContext'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function Chatbot() {
  const { isOpen, closeChat } = useChatbot()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messages.length === 0) {
      const greeting = createMessage('assistant', 'Hello! How can I help you with SmartHub today?')
      setMessages([greeting])
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const createMessage = (role: 'user' | 'assistant', content: string): Message => ({
    id: Math.random().toString(36).substring(7),
    role,
    content,
    timestamp: new Date()
  })

  // Update handleSend function only
const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = createMessage('user', input.trim())
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
        const response = await fetch('http://127.0.0.1:5000/api/chat', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ 
                messages: [...messages, userMessage].map(msg => ({
                    role: msg.role,
                    content: msg.content
                }))
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (data.response) {
            const assistantMessage = createMessage('assistant', data.response)
            setMessages(prevMessages => [...prevMessages, assistantMessage])
        }
    } catch (error) {
        console.error('Chat error:', error)
        const errorMessage = createMessage(
            'assistant', 
            'Sorry, there was an error processing your request. Please try again.'
        )
        setMessages(prevMessages => [...prevMessages, errorMessage])
    } finally {
        setIsLoading(false)
    }
}
  return (
    <aside 
      className={`fixed right-0 top-0 h-full w-96 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="flex flex-col h-full">
        <header className="p-4 border-b border-purple-900 flex justify-between items-center">
          <h3 className="text-purple-300 font-semibold">SmartHub Support</h3>
          <button 
            onClick={closeChat}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' ? 'bg-purple-900 text-white' : 'bg-gray-800 text-gray-200'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-200 p-3 rounded-lg">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-purple-900">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}