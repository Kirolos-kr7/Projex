import Search from '../components/UI/Search'
import NoteCard from '../components/NoteCard'
import { useState } from 'react'
import type { NoteWithUser } from '../types'
import Popup from '../components/UI/Popup'
import NoteDialog from '../components/Dialogs/NoteDialog'
import { Icon } from '@iconify/react/dist/offline'
import GridView from '@iconify-icons/mdi/view-module'
import ListView from '@iconify-icons/mdi/view-sequential'
import ConfirmationDialog from '../components/Dialogs/ConfirmationDialog'
import PageHeader from '../components/UI/PageHeader'
import { trpc } from '../utils/trpc'
import { toast } from 'react-toastify'
import { handleError } from '../utils/helper'
import useDebounce from '../hooks/useDebounce'
import { AnimatePresence } from 'framer-motion'

const Notes = () => {
  const [popupOpened, setPopupOpened] = useState(false)
  const [deletePopup, setDeletePopup] = useState(false)
  const [view, setView] = useState('Grid')
  const [pending, setPending] = useState(true)
  const [editing, setEditing] = useState(false)
  const [notes, setNotes] = useState<NoteWithUser[]>()
  const [selected, setSelected] = useState<NoteWithUser>()
  const [searchQuery, setSearchQuery] = useState('')

  const getNotes = async () => {
    setPopupOpened(false)
    setPending(true)
    const data: any = await trpc.notes.getAll.query({ query: searchQuery })
    setNotes(data)
    setPending(false)
  }

  useDebounce(searchQuery, getNotes, {
    delay: 350
  })

  const editNote = async (id: number) => {
    setEditing(true)
    setPopupOpened(true)
    setSelected(notes?.find((n) => n.id == id))
  }

  const cancel = () => {
    setPopupOpened(false)
    setDeletePopup(false)
    setEditing(false)
    setSelected(undefined)
  }

  const deleteNote = async () => {
    try {
      if (!selected?.id) return
      await trpc.notes.delete.mutate(selected.id)
      toast.success('Note deleted sucessfully')
      cancel()
    } catch (err) {
      handleError(err)
    }
    getNotes()
    setSelected(undefined)
  }

  return (
    <>
      <PageHeader title="Notes" sub="Keep in touch with the team" />

      <div className="mb-2 flex flex-wrap items-center justify-end gap-y-2 sm:!justify-between">
        <Search
          placeholder="Search notes"
          update={(val) => setSearchQuery(val)}
        />
        <div className="flex gap-1">
          <button
            className="btn !p-2"
            onClick={() => (view == 'Grid' ? setView('List') : setView('Grid'))}
          >
            <Icon icon={view != 'Grid' ? GridView : ListView} width="22px" />
          </button>
          <button className="btn base" onClick={() => setPopupOpened(true)}>
            Add Note
          </button>
        </div>{' '}
      </div>
      <div
        className={`mt-4 grid gap-3 ${
          view == 'Grid' && 'grid-cols-2 md:grid-cols-3'
        } `}
      >
        {pending
          ? 'Loading...'
          : notes && notes.length > 0
          ? notes.map((note, i) => (
              <NoteCard
                note={note}
                key={note.id}
                i={i}
                editNote={editNote}
                deleteNote={(id) => {
                  setSelected(notes.find((n) => n.id == id))
                  setDeletePopup(true)
                }}
              />
            ))
          : 'No notes available'}
      </div>

      <AnimatePresence>
        {popupOpened && (
          <Popup
            title={`${editing ? 'Edit' : 'Add'} Note`}
            open={popupOpened}
            closePopup={cancel}
          >
            <NoteDialog
              note={selected}
              done={() => {
                getNotes()
                setSelected(undefined)
              }}
              cancel={cancel}
            />
          </Popup>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletePopup && (
          <Popup title="Delete Note" open={deletePopup} closePopup={cancel}>
            <ConfirmationDialog accept={deleteNote} cancel={cancel} />
          </Popup>
        )}
      </AnimatePresence>
    </>
  )
}

export default Notes
