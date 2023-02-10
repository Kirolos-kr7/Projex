import { Tooltip, PieChart, Pie, Cell } from 'recharts'

const DailyWork = () => {
  const data = [
    { name: 'Todo', value: 4, color: '#82ca9d' },
    { name: 'In Progress', value: 3, color: '#00f00f' },
    { name: 'In Review', value: 3, color: '#ff0ff0' },
    { name: 'Done', value: 2, color: '#f0ff0f' }
  ]

  return (
    <div className="flex flex-col justify-between">
      <h2 className="text-xl font-semibold">Board Status</h2>

      <div className="mx-auto">
        <PieChart width={250} height={250}>
          <Pie data={data} dataKey="value">
            {data.map((d) => (
              <Cell stroke="0" key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  )
}

export default DailyWork
