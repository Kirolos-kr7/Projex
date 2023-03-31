import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import {
  type Notes as Note,
  type User
} from '../../../../node_modules/@prisma/client'
import { trpc } from '../../utils/trpc'

const AddNote = ({
  note,
  done,
  cancel
}: {
  note: (Note & { author: User }) | undefined
  done: () => void
  cancel: () => void
}) => {
  const [err, setErr] = useState('')
  const [length, setLength] = useState(0)

  const calcLength = (e: FormEvent) => {
    const val = (e.target as HTMLInputElement).value
    setLength(val.length)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setErr('')
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const [content] = [...formData.values()]

    try {
      if (note) {
        await trpc.notes.edit.mutate({
          content: content as string,
          noteId: note.id
        })
        toast.success('Updated note sucessfully')
      } else {
        await trpc.notes.create.mutate(content as string)
        toast.success('Added note sucessfully')
      }
      form.reset()
      done()
    } catch (err: any) {
      setErr(err)
    }
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="mb-3 flex flex-col">
        {err && (
          <span className="mb-2 rounded-md bg-red-800 p-2.5 ">{err}</span>
        )}
        <label htmlFor="note">Note</label>
        <textarea
          className="px-3 text-sm"
          name="note"
          id="note"
          defaultValue={note ? note?.content : ''}
          required
          maxLength={255}
          minLength={3}
          autoFocus
          onInput={calcLength}
        ></textarea>
        <span className="mt-2 self-end text-sm text-gray-400">
          {length + ' of 255'}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button className="btn">Save</button>
        <button className="btn danger" type="reset" onClick={() => cancel()}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddNote
