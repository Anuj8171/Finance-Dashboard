import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
]

export function DesktopSidebar() {
  return (
    <div className="hidden md:flex h-full w-64 glass border-r border-white/10 flex-col p-6 gap-8 shrink-0">
      <SidebarContent />
    </div>
  )
}


export function MobileSidebar({ open, onClose }) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 top-0 left-0 h-screen w-64 glass border-r border-white/10 flex flex-col p-6 gap-8 md:hidden"
          >
            <div className="flex justify-end">
              <button onClick={onClose}>
                <X className="text-white" size={22} />
              </button>
            </div>
            <SidebarContent onNavigate={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SidebarContent({ onNavigate }) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center font-bold text-lg text-white">
          F
        </div>
        <span className="text-xl font-bold text-white">FinanceDash</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto">
        <div className="glass p-4 rounded-xl text-center">
          <p className="text-xs text-gray-400">Finance Dashboard</p>
          
        </div>
      </div>
    </>
  )
}
export default DesktopSidebar