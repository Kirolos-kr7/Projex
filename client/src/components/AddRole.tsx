type addFunc = ({ role }: { role: any }) => void

const AddRole = ({ add, cancel }: { add: addFunc; cancel: () => void }) => {
  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement)
        const values = [...data.values()]

        add({ role: values[0] })
      }}
    >
      <label>Role</label>
      <input
        className="mb-3 px-3 text-sm"
        type="text"
        name="role"
        id="role"
        required
        autoFocus
      />

      <div className="mt-3 flex items-center justify-end gap-2">
        <button className="btn">Save</button>
        <button className="btn danger" type="reset" onClick={() => cancel()}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddRole
