import Search from '../components/UI/Search'
import NoteCard from '../components/NoteCard'
import { useState, useEffect } from 'react'
import useAxios from '../hooks/useAxios'
import { Note } from '../types'
import Popup from '../components/UI/Popup'
import NoteDialog from '../components/Dialogs/NoteDialog'
import { Icon } from '@iconify/react/dist/offline'
import GridView from '@iconify-icons/mdi/view-module'
import ListView from '@iconify-icons/mdi/view-sequential'
import ConfirmationDialog from '../components/Dialogs/ConfirmationDialog'
import { toast } from 'react-toastify'
import PageHeader from '../components/UI/PageHeader'

const Notes = () => {
  // const [searchValue, setSearchValue] = useState('')
  const [popupOpened, setPopupOpened] = useState(false)
  const [deletePopup, setDeletePopup] = useState(false)
  const [view, setView] = useState('Grid')
  const [pending, setPending] = useState(true)
  const [editing, setEditing] = useState(false)
  const [onEdit, setOnEdit] = useState<Note>()
  const [onDelete, setOnDelete] = useState<Note>()
  const [notes, setNotes] = useState<Note[]>()

  const getNotes = async () => {
    setPopupOpened(false)
    setPending(true)
    const { data } = await useAxios('/notes')
    setNotes(data)
    setPending(false)
  }

  useEffect(() => {
    getNotes()
  }, [])

  const editNote = async (id: string) => {
    setEditing(true)
    setPopupOpened(true)
    setOnEdit(notes?.find((n) => n.id == id))
  }

  const cancel = () => {
    setPopupOpened(false)
    setDeletePopup(false)
    setEditing(false)
    setOnEdit(undefined)
    setOnDelete(undefined)
  }

  const deleteNote = async () => {
    const { data, ok } = await useAxios('/notes', {
      method: 'delete',
      body: {
        noteId: onDelete?.id
      }
    })

    if (ok) {
      toast.success(data)
      cancel()
      getNotes()
    } else toast.error(data)
  }

  return (
    <>
      <PageHeader title="Notes" sub="Keep in touch with the team" />

      <div className="mb-2 flex items-center justify-between">
        <Search
          placeholder="Search notes"
          // update={(val) => setSearchValue(val)}
        />
        <div className="flex gap-1">
          <button
            className="btn !p-2"
            onClick={() => (view == 'Grid' ? setView('List') : setView('Grid'))}
          >
            <Icon icon={view == 'Grid' ? GridView : ListView} width="22px" />
          </button>
          <button className="btn base" onClick={() => setPopupOpened(true)}>
            Add Note
          </button>
        </div>{' '}
      </div>
      <div className={`mt-4 grid gap-3 ${view == 'Grid' && 'grid-cols-3'} `}>
        {pending
          ? 'Loading...'
          : notes && notes.length > 0
          ? notes.map((note) => (
              <NoteCard
                note={note}
                key={note.id}
                editNote={editNote}
                deleteNote={(id) => {
                  setOnDelete(notes.find((n) => n.id == id))
                  setDeletePopup(true)
                }}
              />
            ))
          : 'No notes available'}
      </div>

      <Popup
        title={`${editing ? 'Edit' : 'Add'} Note`}
        open={popupOpened}
        closePopup={cancel}
      >
        <NoteDialog note={onEdit} done={getNotes} cancel={cancel} />
      </Popup>

      <Popup title="Delete Note" open={deletePopup} closePopup={cancel}>
        <ConfirmationDialog accept={deleteNote} cancel={cancel} />
      </Popup>
    </>
  )
}

export default Notes
