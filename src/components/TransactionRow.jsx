import { motion } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'
import useRoleStore from '../store/roleStore'

const categoryColors = {
  Food: 'bg-orange-500/20 text-orange-400',
  Rent: 'bg-blue-500/20 text-blue-400',
  Travel: 'bg-cyan-500/20 text-cyan-400',
  Shopping: 'bg-pink-500/20 text-pink-400',
  Bills: 'bg-yellow-500/20 text-yellow-400',
  Entertainment: 'bg-purple-500/20 text-purple-400',
  Salary: 'bg-green-500/20 text-green-400',
  Freelance: 'bg-teal-500/20 text-teal-400',
}

function TransactionRow({ transaction, index, onEdit, onDelete }) {
  const { role } = useRoleStore()

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b border-white/5 hover:bg-white/5 transition-all duration-200"
    >
      {/* Date */}
      <td className="py-4 px-4 text-gray-400 text-sm">
        {new Date(transaction.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </td>

      {/* Title */}
      <td className="py-4 px-4 text-white font-medium">
        {transaction.title}
      </td>

      {/* Category */}
      <td className="py-4 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          categoryColors[transaction.category] || 'bg-gray-500/20 text-gray-400'
        }`}>
          {transaction.category}
        </span>
      </td>

      {/* Type */}
      <td className="py-4 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          transaction.type === 'income'
            ? 'bg-green-500/20 text-green-400'
            : 'bg-red-500/20 text-red-400'
        }`}>
          {transaction.type}
        </span>
      </td>

      {/* Amount */}
      <td className={`py-4 px-4 font-bold text-right ${
        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
      }`}>
        {transaction.type === 'income' ? '+' : '-'}₹{Number(transaction.amount).toLocaleString('en-IN')}
      </td>

      {/* Actions - Admin Only */}
      {role === 'admin' && (
        <td className="py-4 px-4">
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => onEdit(transaction)}
              className="p-2 rounded-lg bg-violet-500/20 text-violet-400 hover:bg-violet-500/40 transition-all"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(transaction.id)}
              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      )}
    </motion.tr>
  )
}

export default TransactionRow