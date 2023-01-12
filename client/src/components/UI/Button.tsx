type buttonType = 'danger'

const Button = ({
  children,
  type,
  pending
}: {
  children: any
  type?: buttonType
  pending: boolean
}) => {
  return (
    <button className={`btn ${type}`} disabled={pending}>
      {!pending ? children : 'loading...'}
    </button>
  )
}

export default Button
