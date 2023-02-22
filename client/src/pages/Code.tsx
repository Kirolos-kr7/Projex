import { useState } from 'react'
import Repo from '../components/Board/Repo'
import { Repo as RepoType } from '../types'
import PageHeader from '../components/UI/PageHeader'

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
    <>
      <PageHeader title="Code" sub="Live Repos" />

      <div className="rounded-md bg-gray-900 p-3">
        <h2>Repositories</h2>

        <div className="mt-3 grid grid-cols-4 gap-3">
          {repos.map((repo, i) => {
            return <Repo repo={repo} key={i} />
          })}
        </div>
      </div>
    </>
  )
}

export default Code
