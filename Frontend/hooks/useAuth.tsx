import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthProtectionResult {
  isLoading: boolean
  message: string | null
}

export const useAuthProtection = (isProtectedFromAuth = false): AuthProtectionResult => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      
      if (isProtectedFromAuth && token) {
        router.replace("/admin-dashboard")
        return true
      } else if (!isProtectedFromAuth && !token) {
        router.replace("/admin-login")
        return true
      }
      return false
    }

    // More aggressive navigation blocking
    const blockNavigation = (e: PopStateEvent) => {
      if (localStorage.getItem("token")) {
        e.preventDefault()
        e.stopPropagation()
        // Replace state instead of push
        window.history.replaceState(null, '', window.location.href)
        setMessage("Please sign out to leave the dashboard")
        return false
      }
    }

    const redirected = checkAuth()
    if (!redirected) {
      setIsLoading(false)
    }

    // Replace initial state
    window.history.replaceState(null, '', window.location.href)
    window.addEventListener('popstate', blockNavigation)

    return () => {
      window.removeEventListener('popstate', blockNavigation)
    }
  }, [isProtectedFromAuth, router])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return { isLoading, message }
}