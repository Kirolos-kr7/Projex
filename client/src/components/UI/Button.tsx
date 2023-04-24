type buttonType = 'danger'

const Button = ({
  children,
  type,
  pending,
  onClick
}: {
  children: any
  type?: buttonType
  pending?: boolean
  onClick?: () => void
}) => {
  return (
    <button className={`btn ${type}`} disabled={pending} onClick={onClick}>
      {!pending ? children : 'loading...'}
    </button>
  )
}

export default Button
