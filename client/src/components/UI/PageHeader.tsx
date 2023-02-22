const PageHeader = ({ title, sub }: { title: string; sub?: string }) => {
  return (
    <div className="mb-7">
      <h1 className="font-michroma text-3xl font-semibold">{title}</h1>
      {sub && <p className="mt-1 text-sm text-gray-400">{sub}</p>}
    </div>
  )
}

export default PageHeader
