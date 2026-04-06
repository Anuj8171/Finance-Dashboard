import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-xl border border-white/10">
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="text-violet-400 font-bold">
          ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
      </div>
    )
  }
  return null
}

function BalanceTrendChart({ transactions }) {
  // Calculate monthly balance
  const monthlyData = {}

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString('en-IN', {
      month: 'short',
      year: '2-digit',
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

  const data = Object.entries(monthlyData).map(([month, values]) => ({
    month,
    balance: values.income - values.expense,
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="month"
          tick={{ fill: '#9ca3af', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#9ca3af', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#7c3aed"
          strokeWidth={3}
          dot={{ fill: '#7c3aed', strokeWidth: 2, r: 5 }}
          activeDot={{ r: 7, fill: '#a78bfa' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default BalanceTrendChart