import { motion } from 'framer-motion'
import { Inbox } from 'lucide-react'

function EmptyState({ message = 'No transactions found' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 gap-4"
    >
      <div className="w-20 h-20 rounded-full bg-violet-500/10 flex items-center justify-center">
        <Inbox size={40} className="text-violet-400" />
      </div>
      <p className="text-gray-400 text-lg font-medium">{message}</p>
      <p className="text-gray-600 text-sm">Try adjusting your filters</p>
    </motion.div>
  )
}

export default EmptyState