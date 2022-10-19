import { useState } from 'react'
import Repo from '../components/Board/Repo'
import { Repo as RepoType } from '../types'

const Code = () => {
  const [repos] = useState<RepoType[]>([
    {
      origin: 'Github',
      name: 'Bidit Backend',
      updatedAt: new Date('2/9/2022')
    },
    {
      origin: 'Github',
      name: 'Bidit Client',
      updatedAt: new Date()
    },
    {
      origin: 'Github',
      name: 'Unamed',
      updatedAt: new Date('10/2/2022')
    }
  ])

  return (
    <div>
      <h1 className="page-title">Code</h1>

      <div className="rounded-md bg-gray-900 p-3">
        <h2>Repositories</h2>

        <div className="mt-3 grid grid-cols-4 gap-3">
          {repos.map((repo, i) => {
            return <Repo repo={repo} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Code
