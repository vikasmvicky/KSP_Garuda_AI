import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

// Real data extracted from ka-sll-crimes-2025.csv
const cyberData = [
  { name: 'Investment/Trading Fraud', value: 3489 },
  { name: 'Part-Time Job Fraud', value: 2666 },
  { name: 'Online Money Transfer', value: 1564 },
  { name: 'OTP Frauds', value: 944 },
  { name: 'Job Fraud', value: 643 },
  { name: 'Social Media Crimes', value: 566 },
  { name: 'Digital Arrest', value: 346 },
  { name: 'Fake Customer Care', value: 325 },
]

// Hollywood Neon Colors for the dark theme
const COLORS = ['#06b6d4', '#8b5cf6', '#f43f5e', '#eab308', '#22c55e', '#f97316', '#ec4899', '#6366f1'];

function CyberChart() {
  return (
    <div className="h-full w-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-400 mb-2 tracking-wider">CYBER CRIME BREAKDOWN (SLL - 2025)</h3>
      
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={cyberData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {cyberData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#9ca3af' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Mini Legend at the bottom */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
        {cyberData.map((entry, index) => (
          <div key={index} className="flex items-center text-[10px] text-gray-500">
            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CyberChart