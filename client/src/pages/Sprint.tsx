import { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'
import PageHeader from '../components/UI/PageHeader'
import SprintBox from '../components/SprintBox'
import type { Sprint } from '../types'
import Search from '../components/UI/Search'
import SprintDialog from '../components/Dialogs/SprintDialog'
import Popup from '../components/UI/Popup'
import ConfirmationDialog from '../components/Dialogs/ConfirmationDialog'
import { toast } from 'react-toastify'
import { handleError } from '../utils/helper'
import { AnimatePresence } from 'framer-motion'

const Sprint = () => {
  const [sprintPopup, setSprintPopup] = useState(false)
  const [removePopup, setRemovePopup] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sprints, setSprints] = useState<Sprint[]>([])
  const [selectedSprint, setSelectedSprint] = useState<Sprint | undefined>(
    undefined
  )
  const [activeSprint, setActiveSprint] = useState('')
  const [lastSprintId, setLastSprintId] = useState('')

  const getMetas = async () => {
    const [active, last] = await Promise.all([
      trpc.meta.getValue.query('activeSprint'),
      trpc.meta.getValue.query('lastSprintId')
    ])

    if (active) setActiveSprint(active)
    if (last) setLastSprintId(last)
  }

  const getSprints = async () => {
    const data: any = await trpc.sprints.getAll.query({ query: searchQuery })
    setSprints(data)
  }

  useEffect(() => {
    getMetas()
  }, [])

  useEffect(() => {
    getSprints()
  }, [searchQuery])

  const changeActivatedSprint = async (value: string) => {
    if (activeSprint == value) value = '0'
    try {
      const data = await trpc.meta.setValue.mutate({
        key: 'activeSprint',
        value
      })
      setActiveSprint(data)
    } catch (err) {
      handleError(err)
    }
  }

  const openDialog = (id: number, type: 'sprint' | 'remove') => {
    type == 'sprint' ? setSprintPopup(true) : setRemovePopup(true)
    setSelectedSprint(sprints.find((s) => s.id == id))
  }

  const remove = async () => {
    if (!selectedSprint) return

    try {
      await trpc.sprints.remove.mutate({ id: selectedSprint.id })
    } catch (err) {
      handleError(err)
    }

    toast.success('Sprint removed')
    getSprints()
    cancel()
  }

  const cancel = () => {
    setSprintPopup(false)
    setRemovePopup(false)
    setSelectedSprint(undefined)
  }

  return (
    <>
      <PageHeader title="Sprint" sub="Browse sprints" />

      <div className="mb-2 flex flex-wrap items-center justify-end gap-y-2 sm:!justify-between">
        <Search
          placeholder="Search notes"
          update={(val) => setSearchQuery(val)}
        />
        <button className="btn base" onClick={() => setSprintPopup(true)}>
          New Sprint
        </button>
      </div>

      <div className="mt-3 grid  grid-cols-2 gap-5 sm:grid-cols-3">
        {sprints.map((sprint, i) => (
          <SprintBox
            key={sprint.id}
            sprint={sprint}
            i={i}
            active={activeSprint == String(sprint.id) || activeSprint == ''}
            cas={changeActivatedSprint}
            edit={(id) => openDialog(id, 'sprint')}
            remove={(id) => openDialog(id, 'remove')}
          />
        ))}
      </div>

      <AnimatePresence>
        {sprintPopup && (
          <Popup open={sprintPopup} title="New Sprint" closePopup={cancel}>
            <SprintDialog
              sprint={selectedSprint}
              lastSprintId={lastSprintId}
              done={() => {
                cancel()
                getSprints()
              }}
              cancel={cancel}
            />
          </Popup>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {removePopup && (
          <Popup open={removePopup} title="Remove sprint" closePopup={cancel}>
            <ConfirmationDialog accept={remove} cancel={cancel} />
          </Popup>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sprint

// *****************************************************************
// Search Sprints
// Delete Sprints
// *****************************************************************
