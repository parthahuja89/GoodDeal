"use client"

import { Search, Settings, Gamepad2, CircleUser, LogOut, ChevronDown, Menu } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useSelector } from "react-redux"
import type { RootState } from "../store/redux"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

// Menu items.
const items = [
  {
    title: "Search",
    url: "home",
    icon: Search,
  },
  {
    title: "Steam Deals",
    url: "steam-deals",
    icon: Gamepad2,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
]

export function AppNavbar() {
  const userData = useSelector((state: RootState) => state.user.userData)
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActiveRoute = (url: string) => {
    return location.pathname === `/${url}` || (url === "home" && location.pathname === "/")
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-900/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Good Deals
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {items.map((item) => (
              <Link
                key={item.title}
                to={`/${item.url}`}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActiveRoute(item.url)
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
                {isActiveRoute(item.url) && (
                  <Badge className="bg-purple-500/20 text-purple-300 text-xs px-1.5 py-0.5">Active</Badge>
                )}
              </Link>
            ))}
          </div>

          {/* Right Side - User Menu & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 h-auto p-2 hover:bg-zinc-800/50 rounded-lg"
                >
                  <Avatar className="h-8 w-8 border-2 border-purple-500/50">
                    <AvatarImage
                      src={userData?.picture_url || "/placeholder.svg"}
                      alt={`${userData?.Firstname} ${userData?.Lastname}`}
                    />
                    <AvatarFallback className="bg-purple-500/20 text-purple-300">
                      {userData?.Firstname ? userData.Firstname[0] : <CircleUser className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start text-left">
                    <span className="font-medium text-sm text-white">
                      {userData?.Firstname} {userData?.Lastname}
                    </span>
                    <span className="text-xs text-zinc-400 truncate max-w-[120px]">{userData?.email || "User"}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-zinc-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-zinc-800/95 backdrop-blur-xl border-zinc-700">
                <div className="flex flex-col gap-1 p-3 border-b border-zinc-700">
                  <div className="font-medium text-white">
                    {userData?.Firstname} {userData?.Lastname}
                  </div>
                  <div className="text-xs text-zinc-400">{userData?.email}</div>
                </div>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    to="/settings"
                    className="flex items-center text-zinc-300 hover:text-white hover:bg-zinc-700/50"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-700" />
                <DropdownMenuItem
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                  onClick={() => {
                    document.cookie.split(";").forEach((cookie) => {
                      document.cookie = cookie
                        .replace(/^ +/, "")
                        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`)
                    })
                    window.location.reload()
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-zinc-900/95 backdrop-blur-xl border-zinc-800">
                <SheetHeader className="border-b border-zinc-800 pb-4">
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-xs">GD</span>
                    </div>
                    <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Good Deals
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-4 mt-6">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                    <Avatar className="h-10 w-10 border-2 border-purple-500/50">
                      <AvatarImage
                        src={userData?.picture_url || "/placeholder.svg"}
                        alt={`${userData?.Firstname} ${userData?.Lastname}`}
                      />
                      <AvatarFallback className="bg-purple-500/20 text-purple-300">
                        {userData?.Firstname ? userData.Firstname[0] : <CircleUser className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        {userData?.Firstname} {userData?.Lastname}
                      </span>
                      <span className="text-xs text-zinc-400">{userData?.email}</span>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    {items.map((item) => (
                      <Link
                        key={item.title}
                        to={`/${item.url}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActiveRoute(item.url)
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                        {isActiveRoute(item.url) && (
                          <Badge className="bg-purple-500/20 text-purple-300 text-xs ml-auto">Active</Badge>
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Actions */}
                  <div className="pt-4 border-t border-zinc-800 space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => {
                        document.cookie.split(";").forEach((cookie) => {
                          document.cookie = cookie
                            .replace(/^ +/, "")
                            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`)
                        })
                        window.location.reload()
                      }}
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      <span>Log out</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
