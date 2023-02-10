import { BarChart, Bar, ResponsiveContainer } from 'recharts'

const DailyWork = () => {
  const data = [
    {
      name: 'Page A',
      uv: 4000
    },
    {
      name: 'Page B',
      uv: 3000
    },
    {
      name: 'Page C',
      uv: 2000
    },
    {
      name: 'Page B',
      uv: 3000
    },
    {
      name: 'Page C',
      uv: 2000
    },
    {
      name: 'Page B',
      uv: 3000
    },
    {
      name: 'Page C',
      uv: 2000
    },
    {
      name: 'Page D',
      uv: 2780
    },
    {
      name: 'Page E',
      uv: 1890
    },
    {
      name: 'Page F',
      uv: 2390
    },
    {
      name: 'Page G',
      uv: 3490
    }
  ]

  return (
    <div className="flex flex-col justify-between !bg-zinc-500">
      <h2 className="text-xl font-semibold">Daily Progress</h2>

      <ResponsiveContainer className="mt-5" height={90}>
        <BarChart barSize={5} data={data}>
          <Bar dataKey="uv" className="fill-slate-300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DailyWork
