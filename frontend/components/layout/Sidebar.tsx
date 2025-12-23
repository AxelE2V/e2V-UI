'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Mail,
  Calendar,
  Settings,
  RefreshCcw
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Actions du Jour', href: '/actions-du-jour', icon: Calendar },
  { name: 'Contacts', href: '/contacts', icon: Users },
  { name: 'Séquences', href: '/sequences', icon: GitBranch },
  { name: 'Templates', href: '/templates', icon: Mail },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-e2v-primary text-white">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-white/10">
        <span className="text-xl font-bold">E2V Outreach</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* HubSpot Sync Status */}
      <div className="px-3 py-4 border-t border-white/10">
        <button className="flex items-center w-full px-3 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
          <RefreshCcw className="w-5 h-5 mr-3" />
          Sync HubSpot
        </button>
      </div>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center px-3">
          <div className="w-8 h-8 rounded-full bg-e2v-accent flex items-center justify-center text-sm font-medium">
            AB
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Axel Berard</p>
            <p className="text-xs text-white/50">Sales Manager</p>
          </div>
        </div>
      </div>
    </div>
  )
}
