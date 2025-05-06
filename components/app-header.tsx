"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageSquare, Menu, User, LogOut, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

export function AppHeader() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = () => {
    // In a real app, we would clear auth state here
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <Link href="/home" className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <span>Smart Feedback Collector</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link href="/home" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
            Home
          </Link>
          <Link href="/feedback" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
            Submit Feedback
          </Link>
          <Link href="/admin" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
            Analytics
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container space-y-1 py-3">
            <Link
              href="/home"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/feedback"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Submit Feedback
            </Link>
            <Link
              href="/admin"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Analytics
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
