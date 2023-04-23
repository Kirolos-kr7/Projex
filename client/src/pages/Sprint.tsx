import { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'
import PageHeader from '../components/UI/PageHeader'
import SprintBox from '../components/SprintBox'
import type { Sprint } from '../types'

const Settings = () => {
  const [sprints, setSprints] = useState<Sprint[]>([])
  const [activeSprint, setActiveSprint] = useState('')

  const getActiveSprints = async () => {
    const active: any = await trpc.meta.getValue.query('activeSprint')
    setActiveSprint(active)
  }

  const getSprints = async () => {
    const data: any = await trpc.sprints.getAll.query()
    setSprints(data)
  }

  useEffect(() => {
    getActiveSprints()
    getSprints()
  }, [])

  const changeActivatedSprint = async (value: string) => {
    if (activeSprint == value) value = ''
    await trpc.meta.setValue.mutate({ key: 'activeSprint', value })
    getActiveSprints()
  }

  return (
    <>
      <PageHeader title="Sprint" sub="Browse sprints" />

      <div className="mt-10 grid  grid-cols-2 gap-5 sm:grid-cols-3">
        {sprints.map((sprint) => (
          <SprintBox
            key={sprint.id}
            sprint={sprint}
            active={activeSprint == String(sprint.id)}
            cas={changeActivatedSprint}
          />
        ))}
      </div>
    </>
  )
}

export default Settings
