type buttonType = 'danger'

const Button = ({
  children,
  type,
  pending,
  disabled,
  onClick
}: {
  children: any
  type?: buttonType
  pending?: boolean
  disabled?: boolean
  onClick?: () => void
}) => {
  return (
    <button
      className={`btn ${type}`}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {!pending ? children : 'loading...'}
    </button>
  )
}

export default Button
