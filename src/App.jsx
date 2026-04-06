import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { DesktopSidebar, MobileSidebar } from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Router>
      <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#0f0f1a' }}>

        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#0f0f1a] border-b border-white/10 shrink-0">
          <span className="text-lg font-bold text-white">FinanceDash</span>
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="text-white" size={24} />
          </button>
        </div>

        {/* Body: sidebar + content */}
        <div className="flex flex-1 overflow-hidden">

          {/* Desktop Sidebar */}
          <DesktopSidebar />

          {/* Mobile Drawer */}
          <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

          {/* Main Content */}
          <div className="flex flex-col flex-1 overflow-hidden min-w-0">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-6">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/insights" element={<Insights />} />
              </Routes>
            </main>
          </div>

        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a2e',
              color: '#fff',
              border: '1px solid #7c3aed',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App