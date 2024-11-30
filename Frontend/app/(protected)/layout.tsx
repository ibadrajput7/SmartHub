import { redirect } from "next/navigation"
import { cookies } from "next/headers"
// import { UserProvider } from "@/lib/context/UserContext"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardHeader from "@/componentsCopy/dashboard-header"

const API_URL = "http://127.0.0.1:5000"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check for access token
  const accessToken = cookies().get("access_token")?.value
  
  if (!accessToken) {
    redirect('/login')
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
{/* <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"> */}
    return (
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="flex min-h-screen">
          <AppSidebar user={user} />
          <SidebarInset>
            <div className="flex flex-col w-full">
              <header className="flex h-16 items-center gap-4 border-b px-6">
                <SidebarTrigger />
                {/* <DashboardHeader user={user} /> */}
              </header>
              {/* <UserProvider user={user}> */}
                <main className="flex-1 p-6 w-full">
                  {children}
                </main>
              {/* </UserProvider> */}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  } catch (error) {
    console.error('Layout error:', error)
    redirect('/login?message=Session expired')
  }
}

