import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Award,
  ArrowUp,
  ArrowDown,
  PiggyBank,
  Zap,
} from 'lucide-react'
import useTransactionStore from '../store/transactionStore'

function InsightCard({ title, value, subtitle, icon: Icon, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass p-6 rounded-2xl flex flex-col gap-3 hover:scale-105 transition-transform duration-300"
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-gray-500 text-xs">{subtitle}</p>
    </motion.div>
  )
}

function Insights() {
  const { transactions, fetchTransactions, loading } = useTransactionStore()

  useEffect(() => {
    fetchTransactions()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Analyzing your finances...</p>
        </div>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle size={48} className="text-gray-500" />
          <p className="text-gray-400">No data available for insights</p>
        </div>
      </div>
    )
  }

  

  // Total income and expense
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const totalBalance = totalIncome - totalExpense

  // Savings rate
  const savingsRate = totalIncome > 0
    ? ((totalBalance / totalIncome) * 100).toFixed(1)
    : 0

  // Highest spending category
  const categoryTotals = {}
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount)
    })

  const highestCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0]

  // Lowest spending category
  const lowestCategory = Object.entries(categoryTotals).sort(
    (a, b) => a[1] - b[1]
  )[0]

  // Monthly breakdown
  const monthlyData = {}
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString('en-IN', {
      month: 'long',
      year: 'numeric',
    })
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 }
    }
    if (t.type === 'income') {
      monthlyData[month].income += Number(t.amount)
    } else {
      monthlyData[month].expense += Number(t.amount)
    }
  })

  const months = Object.entries(monthlyData)

  // Best month (highest savings)
  const bestMonth = months.sort(
    (a, b) => (b[1].income - b[1].expense) - (a[1].income - a[1].expense)
  )[0]

  // Worst month (highest expense)
  const worstMonth = months.sort(
    (a, b) => b[1].expense - a[1].expense
  )[0]

  // Average monthly expense
  const avgMonthlyExpense = totalExpense / months.length

  // Biggest single transaction
  const biggestTransaction = [...transactions].sort(
    (a, b) => Number(b.amount) - Number(a.amount)
  )[0]

  // Monthly comparison (last 2 months)
  const sortedMonths = Object.entries(monthlyData).sort(
    (a, b) => new Date(a[0]) - new Date(b[0])
  )

  const lastMonth = sortedMonths[sortedMonths.length - 1]
  const prevMonth = sortedMonths[sortedMonths.length - 2]

  const expenseChange = prevMonth
    ? (((lastMonth[1].expense - prevMonth[1].expense) / prevMonth[1].expense) * 100).toFixed(1)
    : 0

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white">Insights</h1>
        <p className="text-gray-400 text-sm mt-1">
          Smart observations from your financial data
        </p>
      </motion.div>

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <InsightCard
          title="Highest Spending Category"
          value={highestCategory ? highestCategory[0] : 'N/A'}
          subtitle={highestCategory ? `₹${Number(highestCategory[1]).toLocaleString('en-IN')} total spent` : ''}
          icon={TrendingDown}
          color="bg-red-600"
          delay={0}
        />

        <InsightCard
          title="Lowest Spending Category"
          value={lowestCategory ? lowestCategory[0] : 'N/A'}
          subtitle={lowestCategory ? `₹${Number(lowestCategory[1]).toLocaleString('en-IN')} total spent` : ''}
          icon={TrendingUp}
          color="bg-green-600"
          delay={0.1}
        />

        <InsightCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          subtitle="Of total income saved"
          icon={PiggyBank}
          color="bg-violet-600"
          delay={0.2}
        />

        <InsightCard
          title="Best Month"
          value={bestMonth ? bestMonth[0].split(' ')[0] : 'N/A'}
          subtitle={bestMonth ? `Saved ₹${(bestMonth[1].income - bestMonth[1].expense).toLocaleString('en-IN')}` : ''}
          icon={Award}
          color="bg-yellow-600"
          delay={0.3}
        />

        <InsightCard
          title="Biggest Transaction"
          value={biggestTransaction ? `₹${Number(biggestTransaction.amount).toLocaleString('en-IN')}` : 'N/A'}
          subtitle={biggestTransaction ? `${biggestTransaction.title}` : ''}
          icon={Zap}
          color="bg-cyan-600"
          delay={0.4}
        />

        <InsightCard
          title="Avg Monthly Expense"
          value={`₹${Math.round(avgMonthlyExpense).toLocaleString('en-IN')}`}
          subtitle="Average spending per month"
          icon={TrendingDown}
          color="bg-pink-600"
          delay={0.5}
        />

      </div>

      {/* Monthly Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass p-6 rounded-2xl"
      >
        <h2 className="text-white font-semibold mb-6">Monthly Comparison</h2>
        <div className="flex flex-col gap-4">
          {Object.entries(monthlyData).map(([month, values], index) => {
            const savings = values.income - values.expense
            const savingsPct = values.income > 0
              ? ((savings / values.income) * 100).toFixed(0)
              : 0
            return (
              <motion.div
                key={month}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-medium">{month}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-400">
                      +₹{values.income.toLocaleString('en-IN')}
                    </span>
                    <span className="text-red-400">
                      -₹{values.expense.toLocaleString('en-IN')}
                    </span>
                    <span className={savings >= 0 ? 'text-violet-400' : 'text-orange-400'}>
                      {savingsPct}% saved
                    </span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(savingsPct, 100)}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="h-full bg-violet-500 rounded-full"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      
      {prevMonth && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className={`glass p-6 rounded-2xl border ${
            Number(expenseChange) > 0
              ? 'border-red-500/30'
              : 'border-green-500/30'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              Number(expenseChange) > 0 ? 'bg-red-500/20' : 'bg-green-500/20'
            }`}>
              {Number(expenseChange) > 0
                ? <ArrowUp size={24} className="text-red-400" />
                : <ArrowDown size={24} className="text-green-400" />
              }
            </div>
            <div>
              <p className="text-white font-semibold">Monthly Expense Change</p>
              <p className={`text-sm mt-1 ${
                Number(expenseChange) > 0 ? 'text-red-400' : 'text-green-400'
              }`}>
                {Number(expenseChange) > 0 ? '📈' : '📉'}
                Your expenses {Number(expenseChange) > 0 ? 'increased' : 'decreased'} by{' '}
                <span className="font-bold">{Math.abs(expenseChange)}%</span>{' '}
                compared to last month
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="glass p-6 rounded-2xl"
      >
        <h2 className="text-white font-semibold mb-6">
          Category Spending Breakdown
        </h2>
        <div className="flex flex-col gap-4">
          {Object.entries(categoryTotals)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount], index) => {
              const percentage = ((amount / totalExpense) * 100).toFixed(1)
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-medium">{category}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm">
                        ₹{Number(amount).toLocaleString('en-IN')}
                      </span>
                      <span className="text-violet-400 text-sm font-medium">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.08 }}
                      className="h-full rounded-full"
                      style={{
                        background: `hsl(${index * 45}, 70%, 60%)`,
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
        </div>
      </motion.div>

    </div>
  )
}

export default Insights