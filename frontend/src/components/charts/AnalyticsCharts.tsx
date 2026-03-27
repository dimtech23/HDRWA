import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

const viewsData = [
  { month: 'Jan', views: 120 },
  { month: 'Feb', views: 180 },
  { month: 'Mar', views: 260 },
  { month: 'Apr', views: 220 },
  { month: 'May', views: 310 },
  { month: 'Jun', views: 380 },
]

export function AnalyticsCharts() {
  return (
    <div className="h-56 rounded-xl border border-section bg-white p-4">
      <h3 className="mb-1 font-heading text-sm font-semibold text-primary">
        Dataset views
      </h3>
      <p className="mb-3 text-[11px] text-text/70">
        Mock analytics for demonstration. Connect to real metrics later.
      </p>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={viewsData} margin={{ left: -24, right: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tick={{ fontSize: 10 }}
            axisLine={false}
          />
          <YAxis
            tickLine={false}
            tick={{ fontSize: 10 }}
            axisLine={false}
            width={28}
          />
          <Tooltip
            contentStyle={{
              fontSize: 11,
              borderRadius: 8,
              borderColor: '#E7F3F7',
            }}
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#5f9e7f"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

