import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-xl border border-white/10">
        <p className="text-gray-400 text-xs mb-2">{label}</p>
        {payload.map((p, i) => (
          <p
            key={i}
            style={{ color: p.color }}
            className="text-sm font-bold"
          >
            {p.name}: ₹{p.value.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function IncomeExpenseBar({ transactions }) {
  // Calculate monthly income vs expense
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
    Income: values.income,
    Expense: values.expense,
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} barGap={8}>
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
        <Legend
          formatter={(value) => (
            <span style={{ color: '#9ca3af', fontSize: '12px' }}>{value}</span>
          )}
        />
        <Bar dataKey="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
        <Bar dataKey="Expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default IncomeExpenseBar