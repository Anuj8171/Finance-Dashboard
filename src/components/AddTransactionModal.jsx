import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import useTransactionStore from '../store/transactionStore'
import toast from 'react-hot-toast'

const categories = [
  'Food', 'Rent', 'Travel', 'Shopping',
  'Bills', 'Entertainment', 'Salary', 'Freelance'
]

function AddTransactionModal({ isOpen, onClose }) {
  const { addTransaction } = useTransactionStore()

  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.title || !form.amount || !form.date) {
      toast.error('Please fill all fields!')
      return
    }

    setLoading(true)
    try {
      await addTransaction({
        ...form,
        amount: Number(form.amount),
      })
      toast.success('Transaction added successfully!')
      onClose()
      setForm({
        title: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
      })
    } catch (err) {
      toast.error('Failed to add transaction!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="glass p-6 rounded-2xl border border-white/20">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Add Transaction
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <div className="flex flex-col gap-4">

                {/* Title */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Grocery Shopping"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-violet-500 transition-all"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Amount (₹)</label>
                  <input
                    name="amount"
                    type="number"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="e.g. 1500"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-violet-500 transition-all"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a2e] border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Type */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Type</label>
                  <div className="flex gap-3">
                    {['income', 'expense'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setForm({ ...form, type: t })}
                        className={`flex-1 py-3 rounded-xl font-medium capitalize transition-all ${
                          form.type === t
                            ? t === 'income'
                              ? 'bg-green-500/30 text-green-400 border border-green-500/50'
                              : 'bg-red-500/30 text-red-400 border border-red-500/50'
                            : 'bg-white/10 text-gray-400 border border-white/10'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Date</label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 transition-all"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3 bg-violet-600 hover:bg-violet-700 rounded-xl font-semibold text-white transition-all disabled:opacity-50 mt-2"
                >
                  {loading ? 'Adding...' : 'Add Transaction'}
                </button>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AddTransactionModal