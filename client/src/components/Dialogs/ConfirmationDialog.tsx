const ConfirmationDialog = ({
  message = 'Are you sure you want to proceed?',
  accept,
  cancel
}: {
  message?: string
  accept: () => void
  cancel: () => void
}) => {
  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault()
        accept()
      }}
    >
      <p>{message}</p>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button className="btn danger">Yes</button>
        <button className="btn" type="reset" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ConfirmationDialog
