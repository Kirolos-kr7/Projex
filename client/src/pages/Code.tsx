import { useEffect, useState } from 'react'
import Repo from '../components/Board/Repo'
import { Repo as RepoType } from '../types'

import PageHeader from '../components/UI/PageHeader'
import { trpc } from '../utils/trpc'

const Code = () => {
  const [repos, setRepos] = useState<RepoType[]>([])

  const getRepos = async () => {
    const data: any = await trpc.github.repos.query()
    setRepos(data)
  }

  useEffect(() => {
    getRepos()
  }, [])

  return (
    <>
      <PageHeader title="Code" sub="Live Repos" />

      <div className="rounded-md bg-gray-900 p-3">
        <h2>Repositories</h2>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {repos?.map((repo, i) => {
            return <Repo repo={repo} key={i} />
          })}
        </div>
      </div>
    </>
  )
}

export default Code
