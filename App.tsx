"use client"

import React, { useState } from "react"
import { Toaster as SonnerToaster } from "sonner"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import BookCreator from "./pages/BookCreator"
import BookEditor from "./pages/BookEditor"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import "./App.css"

// Simple navigation state management
export type RouteParams = {
  id?: string
  [key: string]: any
}

export type NavigationState = {
  returnTo?: string
  action?: string | null
  projectId?: string | number
  projectTitle?: string
  userName?: string
  bookData?: any
  [key: string]: any
}

// Create a global navigation context
export const NavigationContext = React.createContext<{
  currentPath: string
  navigate: (path: string, state?: NavigationState) => void
  params: RouteParams
  navigationState: NavigationState
}>({
  currentPath: "/",
  navigate: () => {},
  params: {},
  navigationState: {},
})

function App() {
  // State to track the current path
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname)
  const [params, setParams] = useState<RouteParams>({})
  const [navigationState, setNavigationState] = useState<NavigationState>({})

  // Navigation function to replace useNavigate
  const navigate = (path: string, state?: NavigationState) => {
    // Extract path parameters if any (e.g., /book-editor/:id)
    const pathParts = path.split("/")
    const newParams: RouteParams = {}

    if (pathParts.length > 2 && pathParts[1] === "book-editor") {
      newParams.id = pathParts[2]
      // Set the clean path without parameters
      path = "/book-editor"
    }

    setParams(newParams)
    setCurrentPath(path)

    if (state) {
      setNavigationState(state)
    }

    // Update browser URL for better UX (optional)
    window.history.pushState(null, "", path)
  }

  // Render the appropriate component based on the current path
  const renderPage = () => {
    switch (currentPath) {
      case "/":
        return <Index />
      case "/create-book":
        return <BookCreator />
      case "/book-editor":
        return <BookEditor />
      case "/auth":
        return <Auth />
      case "/dashboard":
        return <Dashboard />
      default:
        return <NotFound />
    }
  }

  return (
    <NavigationContext.Provider value={{ currentPath, navigate, params, navigationState }}>
      {renderPage()}
      <SonnerToaster />
    </NavigationContext.Provider>
  )
}

export default App

