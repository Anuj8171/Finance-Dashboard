import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ArrowUpDown, Plus, Download } from 'lucide-react'
import useTransactionStore from '../store/transactionStore'
import useRoleStore from '../store/roleStore'
import TransactionRow from '../components/TransactionRow'
import AddTransactionModal from '../components/AddTransactionModal'
import EditTransactionModal from '../components/EditTransactionModal'
import EmptyState from '../components/EmptyState'
import toast from 'react-hot-toast'

const categories = [
  'all', 'Food', 'Rent', 'Travel', 'Shopping',
  'Bills', 'Entertainment', 'Salary', 'Freelance'
]

function Transactions() {
  const {
    fetchTransactions,
    getFilteredTransactions,
    deleteTransaction,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    loading,
  } = useTransactionStore()

  const { role } = useRoleStore()

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const filteredTransactions = getFilteredTransactions()

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction)
    setIsEditOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id)
      toast.success('Transaction deleted! 🗑️')
    }
  }

  // Export to CSV
  const exportCSV = () => {
    const headers = ['Date', 'Title', 'Category', 'Type', 'Amount']
    const rows = filteredTransactions.map((t) => [
      t.date,
      t.title,
      t.category,
      t.type,
      t.amount,
    ])
    const csvContent = [headers, ...rows]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transactions.csv'
    a.click()
    toast.success('Exported to CSV! 📥')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="text-gray-400 text-sm mt-1">
            {filteredTransactions.length} transactions found
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Export CSV */}
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 text-sm transition-all"
          >
            <Download size={16} />
            Export
          </button>

          {/* Add Transaction - Admin Only */}
          {role === 'admin' && (
            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-all"
            >
              <Plus size={16} />
              Add Transaction
            </button>
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass p-4 rounded-2xl flex flex-wrap gap-4 items-center"
      >
        {/* Search */}
        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 flex-1 min-w-50">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white placeholder-gray-500 outline-none text-sm w-full"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-transparent text-white outline-none text-sm cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#1a1a2e]">
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-transparent text-white outline-none text-sm cursor-pointer"
          >
            <option value="all" className="bg-[#1a1a2e]">All Types</option>
            <option value="income" className="bg-[#1a1a2e]">Income</option>
            <option value="expense" className="bg-[#1a1a2e]">Expense</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
          <ArrowUpDown size={16} className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-white outline-none text-sm cursor-pointer"
          >
            <option value="date" className="bg-[#1a1a2e]">Sort by Date</option>
            <option value="amount" className="bg-[#1a1a2e]">Sort by Amount</option>
          </select>
        </div>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass rounded-2xl overflow-hidden"
      >
        {filteredTransactions.length === 0 ? (
          <EmptyState message="No transactions found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-left text-gray-400 text-sm font-medium">Date</th>
                  <th className="py-4 px-4 text-left text-gray-400 text-sm font-medium">Title</th>
                  <th className="py-4 px-4 text-left text-gray-400 text-sm font-medium">Category</th>
                  <th className="py-4 px-4 text-left text-gray-400 text-sm font-medium">Type</th>
                  <th className="py-4 px-4 text-right text-gray-400 text-sm font-medium">Amount</th>
                  {role === 'admin' && (
                    <th className="py-4 px-4 text-right text-gray-400 text-sm font-medium">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <TransactionRow
                    key={transaction.id || index}
                    transaction={transaction}
                    index={index}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      
      <AddTransactionModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
      <EditTransactionModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false)
          setSelectedTransaction(null)
        }}
        transaction={selectedTransaction}
      />

    </div>
  )
}

export default Transactions