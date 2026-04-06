import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import useTransactionStore from '../store/transactionStore'
import SummaryCard from '../components/SummaryCard'
import BalanceTrendChart from '../components/charts/BalanceTrendChart'
import SpendingPieChart from '../components/charts/SpendingPieChart'
import IncomeExpenseBar from '../components/charts/IncomeExpenseBar'

function Dashboard() {
  const { transactions, fetchTransactions, loading } = useTransactionStore()

  useEffect(() => {
    fetchTransactions()
  }, [])

  // Calculate summary
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const totalBalance = totalIncome - totalExpense

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading your finances...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6  pb-6">

      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Your financial overview at a glance
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Balance"
          amount={totalBalance}
          icon={Wallet}
          color="bg-violet-600"
          delay={0}
        />
        <SummaryCard
          title="Total Income"
          amount={totalIncome}
          icon={TrendingUp}
          color="bg-green-600"
          delay={0.1}
        />
        <SummaryCard
          title="Total Expenses"
          amount={totalExpense}
          icon={TrendingDown}
          color="bg-red-600"
          delay={0.2}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Balance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass p-6 rounded-2xl"
        >
          <h2 className="text-white font-semibold mb-4">Balance Trend</h2>
          <BalanceTrendChart transactions={transactions} />
        </motion.div>

        {/* Spending Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass p-6 rounded-2xl"
        >
          <h2 className="text-white font-semibold mb-4">Spending Breakdown</h2>
          <SpendingPieChart transactions={transactions} />
        </motion.div>

      </div>

      {/* Charts Row 2 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass p-6 rounded-2xl"
      >
        <h2 className="text-white font-semibold mb-4">
          Income vs Expenses
        </h2>
        <IncomeExpenseBar transactions={transactions} />
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass p-6 rounded-2xl"
      >
        <h2 className="text-white font-semibold mb-4">Recent Transactions</h2>
        <div className="flex flex-col gap-3">
          {transactions.slice(0, 5).map((t) => (
            <div
              key={t.id ?? t.title + t.date}
              className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  t.type === 'income' ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <div>
                  <p className="text-white text-sm font-medium">{t.title}</p>
                  <p className="text-gray-500 text-xs">{t.category} • {new Date(t.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                  })}</p>
                </div>
              </div>
              <p className={`font-bold text-sm ${
                t.type === 'income' ? 'text-green-400' : 'text-red-400'
              }`}>
                {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

export default Dashboard