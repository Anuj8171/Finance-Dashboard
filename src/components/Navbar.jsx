import { motion } from 'framer-motion'
import useRoleStore from '../store/roleStore'
import { Shield, Eye } from 'lucide-react'

function Navbar() {
  const { role, setRole } = useRoleStore()

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-16 glass border-b m-0.5 border-white/10 flex items-center justify-between px-6"
    >
      {/* Left */}
      <div>
        <h1 className="text-lg font-semibold text-white">
          Welcome back!
        </h1>
        <p className="text-xs text-gray-400">
          Here's your financial overview
        </p>
      </div>

      {/* Right - Role Switcher */}
      <div className="flex items-center gap-3">
        
        {/* Role Badge */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
          role === 'admin'
            ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
        }`}>
          {role === 'admin' ? <Shield size={12} /> : <Eye size={12} />}
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </div>

        {/* Role Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-white/10 border border-white/20 text-white text-sm rounded-xl px-3 py-2 outline-none cursor-pointer hover:bg-white/20 transition-all"
        >
          <option value="viewer" className="bg-[#1a1a2e]">Viewer</option>
          <option value="admin" className="bg-[#1a1a2e]">Admin</option>
        </select>

      </div>
    </motion.div>
  )
}

export default Navbar