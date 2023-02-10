import { FormEvent, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import { toast } from 'react-toastify'
import { Note } from '../../types'

const AddNote = ({
  note,
  done,
  cancel
}: {
  note: Note | undefined
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
    let data0, ok0

    if (note) {
      const { data, ok } = await useAxios('/notes', {
        method: 'put',
        body: {
          noteId: note?.id,
          content
        }
      })

      data0 = data
      ok0 = ok
    } else {
      const { data, ok } = await useAxios('/notes', {
        method: 'post',
        body: {
          content
        }
      })

      data0 = data
      ok0 = ok
    }

    if (ok0) {
      toast.success(data0)
      form.reset()
      done()
    } else if (data0.name == 'ZodError') setErr(data0.issues[0].message)
    else setErr(data0)
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="mb-3 flex flex-col">
        {err && (
          <span className="mb-2 rounded-md bg-red-800 p-2.5 ">{err}</span>
        )}
        <label className="label" htmlFor="note">
          Note
        </label>
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
