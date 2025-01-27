import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { useState } from 'react'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { ChatbotProvider } from '@/contexts/ChatbotContext'
// import { UserProvider } from "@/lib/context/UserContext"
import HeaderSider from '@/components/HeaderSider'
import SiderBar from '@/components/Siderbar'
// import { AppSidebar } from "@/components/app-sidebar"
// import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
// import DashboardHeader from "@/componentsCopy/dashboard-header"

const API_URL = "http://127.0.0.1:5000"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check for access token
  const accessToken = cookies().get("access_token")?.value
  
  if (!accessToken) {
    // redirect('/login')
  }

  try {
    // Validate token with backend
    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    })

    const data = await response.json()

    if (!response.ok) {
      const errorMessage = data.detail || "Auth failed"
      redirect(`/login?message=${encodeURIComponent(errorMessage)}`)
    }

    const user = {
      email: data.email,
      is_superuser: data.is_superuser ?? false,
    }

    // Get cookie for sidebar state
    const cookieStore = cookies()
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

    return (
      
        <ChatbotProvider>
          <SidebarProvider>
            <div className="min-h-screen bg-gray-900">
              <HeaderSider />
              <SiderBar />
              
              <div className="lg:pl-64 flex flex-col min-h-screen">
                <main className="flex-1 pt-16">
                  <div className="px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ChatbotProvider>
      )
    
  } catch (error) {
    console.error('Layout error:', error)
    redirect('/login?message=Session expired')
  }
}

